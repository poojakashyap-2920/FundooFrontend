CREATE TABLE collaborationEntity (
    CollaboratorId INT PRIMARY KEY,
    NoteId INT,
    CollaboratorEmail VARCHAR(255),
    OwnerEmail VARCHAR(255),
    FOREIGN KEY (NoteId) REFERENCES notesEntity(NoteId),
    FOREIGN KEY (CollaboratorEmail) REFERENCES UserEntityp(EmailId),
    FOREIGN KEY (OwnerEmail) REFERENCES UserEntityp(EmailId)
);
