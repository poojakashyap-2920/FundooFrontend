﻿using BusinessLayer.InterfaceBl;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelLayer;
using ModelLayer.Entities;
using RepositoryLayer.CustomExceptions;
using System.Security.Claims;
using System.Security.Cryptography;

namespace FundooNotesUsingDapper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LabelController : ControllerBase
    {
        private readonly ILabelBl labelbl;

        public LabelController(ILabelBl labelbl)
        {
            this.labelbl = labelbl;
        }

       

        [HttpPost("AddLabel")]
        public async Task<IActionResult> AddLabel(Label label)
        {
            label.Email = User.FindFirstValue(ClaimTypes.Email);
            try
            {
                int result = await labelbl.AddLabel(label);   

                if (result == 1)
                {
                    return Ok(new ResponseModel<object>
                    {
                        Success = true,
                        Message = "label added successfully",
                        Data = label
                    });
                }
                else
                {
                    return BadRequest(new ResponseModel<object>
                    {
                        Success = false,
                        Message = "Faild to add label"

                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModel<object>
                {
                    Success = false,
                    Message = ex.Message

                }); ;
            }
        }
        


        [HttpGet("GetLabel")]
        public async Task<IActionResult> GetUserNoteLabels()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            try
            {
                var labels = await labelbl.GetUserNoteLabels(email);

                if (labels.Any())
                {
                    return Ok(new ResponseModel<IEnumerable<Label>>
                    {
                        Success = true,
                        Message = "Labels retrieved successfully",
                        Data = labels
                    });
                }
                else
                {
                    return NotFound(new ResponseModel<object>
                    {
                        Success = false,
                        Message = "No labels found for the provided email"
                    });
                }
            }
            catch(EmptyListException ex)

            {
                return BadRequest(new ResponseModel<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModel<object>
                {
                    Success = false,
                    Message = "An error occurred while processing the request"
                });
            }
        }
        



        [HttpPut("updateName")]
        public async Task<IActionResult> UpdateName(string newLabelName, string oldLabelName)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            try
            {
                int rowsAffected = await labelbl.UpdateName(newLabelName, oldLabelName, email);

                if (rowsAffected > 0)
                {
                    return Ok(new ResponseModel<object>
                    {
                        Success = true,
                        Message = "Label name updated successfully"
                    });
                }
                else
                {
                    return NotFound(new ResponseModel<object>
                    {
                        Success = false,
                        Message = "No label found with the provided name and email"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModel<object>
                {
                    Success = false,
                    Message = "An error occurred while processing the request",
                    Data = ex.Message
                });
            }
        }
        


        [HttpDelete]
        public async Task<IActionResult> DeleteLabel(string name)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            try
            {
                int result = await labelbl.DeleteLabel(name, email);

                if (result > 0)
                {
                    return Ok(new ResponseModel<object>
                    {
                        Success = true,
                        Message = "Label deleted successfully"
                    });
                }
                else
                {
                    return NotFound(new ResponseModel<object>
                    {
                        Success = false,
                        Message = "Label not found or not deleted"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest
                    (new ResponseModel<object>
                {
                    Success = false,
                    Message = ex.Message,
                    
                });
            }
        }
        



    }
}
