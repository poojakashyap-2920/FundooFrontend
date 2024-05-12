CREATE TABLE UserNote (
    NoteId INT PRIMARY KEY IDENTITY,
    Title NVARCHAR(255), 
    Description NVARCHAR(MAX), 
    IsArchived BIT, 
    IsColour NVARCHAR(50), 
    IsPinned BIT, 
    IsTrash BIT, 
    Reminder DATETIME, 
    EmailId VARCHAR(100) NOT NULL,
    CONSTRAINT FK_UserNote_UserEntities FOREIGN KEY (EmailId) REFERENCES userEntityP(EmailId)
);