﻿using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ModelLayer.Entities;
using RepositoryLayer.Context;
using RepositoryLayer.CustomExceptions;
using RepositoryLayer.Interface;
using RepositoryLayer.NestedMethods;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace RepositoryLayer.Services
{
    public class UserService:IUser
    {
        private readonly DapperContext _context;
        private static string otp;
        private static string mailid;
        private static User entity;
        public UserService(DapperContext context)
        {
            _context = context;
        }

        //Logic for inserting records
        public async Task<int> Insertion(string firstname, string lastname, string emailid, string password)
        {
            var query = "insert into userEntityP(FirstName, LastName, EmailId, Password) values(@FirstName, @LastName, @EmailId, @Password)";

            string encryptedPassword = NestedMethodsClass.EncryptPassword(password);

            var parameters = new DynamicParameters();
            parameters.Add("@FirstName", firstname, DbType.String);
            parameters.Add("@LastName", lastname, DbType.String);
            if (!NestedMethodsClass.IsValidGmailAddress(emailid))
            {
                throw new InvalidEmailFormatException("Invalid Gmail address format");
            }
            else
            {
                parameters.Add("@EmailId", emailid, DbType.String);
            }
            if (!NestedMethodsClass.IsStrongPassword(password))
            {
                throw new InvalidPasswordException("password is invalid format");
            }
            else
            {
                parameters.Add("@Password", encryptedPassword, DbType.String);
            }

            using (var connection = _context.CreateConnection())
            {
                return await connection.ExecuteAsync(query, parameters);
            }
        }
        


        //logic for Display the all users

        public async Task<IEnumerable<User>> GetUsers()
        {
            var query = "SELECT * FROM userEntityP";

            using (var connection = _context.CreateConnection())
            {
                var persons = await connection.QueryAsync<User>(query);

                if (persons.Any())
                {
                    return persons;
                }
                else
                {
                    throw new EmptyListException("No user is present in the table.");
                }
            }
        }
        

        //Get the user details based on email

        public async Task<IEnumerable<User>> GetUsersByEmail(string email)
        {
            var query = "select * from userEntityP WHERE EmailId = @EmailId";
            using (var connection = _context.CreateConnection())
            {
                var persons = await connection.QueryAsync<User>(query, new { EmailId = email });
                if (persons.Any())
                {
                    return persons;
                }
                else
                {
                    throw new EmptyListException("No user is present with this emailId in the table.");
                }
            }

        }
        


        public async Task<int> DeleteUserByEmail(string email)
        {
            var delete_query = "DELETE FROM userEntityP WHERE EmailId = @EmailId";

            using (var connection = _context.CreateConnection())
            {
                int rowsAffected = await connection.ExecuteAsync(delete_query, new { EmailId = email });
                if (rowsAffected > 0)
                {
                    return rowsAffected;
                }
                return 0;
            }
        }

        //login
        public async Task<IEnumerable<User>> Login(string email, string password)
        {

            var query = "SELECT * FROM userEntityP WHERE EmailId = @EmailId";

            using (var connection = _context.CreateConnection())
            {
                var users = await connection.QueryAsync<User>(query, new { EmailId = email });
                if (users.Any())
                {
                    foreach (var user in users)
                    {
                      
                        string storedPassword = NestedMethodsClass.DecryptPassword(user.Password);
                        if (password == storedPassword)
                        {
                         
                            return new List<User> { user };

                        }
                        else
                        {
                            throw new PasswordMissMatchException("passkey not match");
                        }
                    }
                }
                else
                    throw new UserNotFoundException("user not found in data base please create account");
                return Enumerable.Empty<User>();
            }
        }
        
        


        public Task<String> ChangePasswordRequest(string Email)
        {
            try
            {
                entity = GetUsersByEmail(Email).Result.FirstOrDefault();
            }
            catch (Exception e)
            {
                throw new UserNotFoundException("UserNotFoundByEmailId" + e.Message);
            }

            string generatedotp = "";
            Random r = new Random();

            for (int i = 0; i < 6; i++)
            {
                generatedotp += r.Next(0, 10);
            }
            otp = generatedotp;
            mailid = Email;
            NestedMethodsClass.sendMail(Email, generatedotp);
            Console.WriteLine(otp);
            return Task.FromResult("MailSent ✔️");

        }
        


        public async Task<string> ChangePassword(string otp, string password)
        {
            try
            {
                if (string.IsNullOrEmpty(otp))
                {
                    return "Generate OTP First";
                }

                if (NestedMethodsClass.DecryptPassword(entity.Password).Equals(password))
                {
                    throw new PasswordMissMatchException("Don't give the existing password");
                }

                await Console.Out.WriteLineAsync(password);
                if (!NestedMethodsClass.IsStrongPassword(password))
                {
                    return "Password is not followed regex";
                }

                if (!otp.Equals(otp))
                {
                    return "OTP mismatch";
                }

                var result = await ResetPasswordByEmail(mailid, NestedMethodsClass.EncryptPassword(password));
                entity = null;
                otp = null;
                mailid = null;
                return $"password changed";
            }
            catch (PasswordMissMatchException ex)
            {
                return ex.Message;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        

        //update password using email

        private async Task<int> ResetPasswordByEmail(string emailid, string newPassword)
        {
            var users = await GetUsersByEmail(emailid);
            if (!users.Any())
            {
                throw new EmailNotFoundException("Email does not exist.");
            }
            else 
            {
                var query = "UPDATE userEntityP SET Password = @NewPassword WHERE EmailId = @Email";
                var parameters = new DynamicParameters();
                parameters.Add("@NewPassword", newPassword, DbType.String);
                parameters.Add("@Email", emailid, DbType.String);
                int rowsAffected = 0;
                using (var connection = _context.CreateConnection())
                {

                    rowsAffected = await connection.ExecuteAsync(query, parameters);
                    if (rowsAffected > 0)
                    {
                        return rowsAffected;
                    }
                    else
                    {
                        return 0;
                    }


                }
            }
        }

    }
}
