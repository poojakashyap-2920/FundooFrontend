CREATE TABLE Label (
    NoteId INT,
    EmailId VARCHAR(100),
    LabelName VARCHAR(100),
    FOREIGN KEY (NoteId) REFERENCES UserNote (NoteId),
    FOREIGN KEY (EmailId) REFERENCES UserEntityP (EmailId)
);
