# Ascension
## CLOUD FUNCTIONS    
    STUDENT ENTITY
        Function: AddStudent()
        Parameters: FirstName, MiddleName, LastName, Email, ContactNumber, 
                    UserName, Address, SchoolID, YearLevel, StudentUnitIDPointer, 
                    StudentDegreeIDPointer, StudentCoursesIDPointer,
        Purpose: Save the student object into the database

        Function: afterSave(Student)
        Parameters: XP, AscensionPoints, 
                    BadgesIDEarned(Check RewardBadge() function: Array of RewardIDs where Reward consists of BadgeID, RewardType:Badge, DateRewarded), 
                    TrophiesIDUnlocked(Check RewardTrophy() function: Array of RewardIDs where Reward consists of TrophyID, RewardType:Trophy, DateRewarded), 
                    ChosenTrophies, AvatarsIDUnlocked, FrameIDUnlocked, 
                    BannerID, CoverPhotoIDUnlocked, AscensionTitle,
                    StudentHouseIDPointer, EquippedCosmetics
        Purpose: Add the other attributes only 'after' the student object is saved

        Function: EditStudent()
        Parameters: StudentID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the student

        Function: DeleteStudent()
        Parameters: StudentID
        Purpose: Delete the student from the database

        Function: GetStudentData()
        Parameters: StudentID, Type
        Purpose: Retrieve the data stored in student object, or returns query's result if Type is equal to 1

        Function: AssignHouse()
        Parameters: StudentID, HouseID
        Purpose: Set the student as a member of a house (random)

        Function: ChangeStudentHouse()
        Parameters: StudentID
        Purpose: Delete the student as a member of the previous house. Set the student as a member of another house 

        Function: ChangeTopTrophies()
        Parameters: StudentID, TrophyID_1, TrophyID_2, TrophyID_3 (ID must be a RewardID based on the container of TrophiesIDUnlocked)
        Purpose: Set which trophies will be shown in the student profile

        Function: AddStudentCosmetic()
        Parameters: StudentID, CosmeticID, CosmeticType
        Purpose: Add cosmetic (avatar, frame, background) to the student object

        Function: DeleteStudentCosmetic()
        Parameters: StudentID, CosmeticID, CosmeticType
        Purpose: Delete cosmetic (avatar, frame, background) from the student object

        Function: ChangeEquippedStudentCosmetic()
        Parameters: StudentID, CosmeticType, CosmeticID
        Purpose: Change the equipped cosmetic of the student object

        Function: DisplayStudentXPTitle()
        Parameters: StudentID, DisplayTitle: boolean
        Purpose: Allows the student to show/hide his xp title

        Function: GetStudents()
        Parameters: 
        Purpose: Get all the students saved in the database. Useful when in need of removing non-existing objects the students have relationship with, editing the attributes of students, or just checking the list of students

    TEACHER ENTITY  (Almost same with NT_DISTRIBUTOR entity)
        Function: AddTeacher()
        Parameters: FirstName, MiddleName, LastName, Email, ContactNumber, 
                    RegisterDate, JobTitle, TeacherUnitIDPointer,
                    TeacherCoursesIDPointer,
        Purpose: Save the teacher object into the database

        Function: afterSave(Teacher)
        Parameters: PendingApprovalRewarding: array
        Purpose: Add the remaining attribute only 'after' the teacher object is saved

        Function: EditTeacher()
        Parameters: TeacherID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the Teacher

        Function: DeleteTeacher()
        Parameters: TeacherID
        Purpose: Delete the Teacher from the database

        Function: GetTeacherData()
        Parameters: TeacherID, Type
        Purpose: Retrieve the data stored in Teacher object, or returns query's result if Type is equal to 1

        Function: GetTeachers()
        Parameters: 
        Purpose: Get all the teachers saved in the database. Useful when in need of removing non-existing objects the teachers have relationship with, editing the attributes of teachers, or just checking the list of students

    BADGE ENTITY
        Function: AddBadge()
        Parameters: BadgeName, BadgeDescription, BadgePoints, BadgeType : ("Student", "House"), BadgeImage : base64, BadgeImageName, BadgeDesignInspiration
        Purpose: Save the badge object into the database

        Function: EditBadge()
        Parameters: BadgeID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the badge

        Function: DeleteBadge()
        Parameters: BadgeID
        Purpose: Delete the badge from the database

        Function: GetBadgeData()
        Parameters: BadgeID, Type
        Purpose: Retrieve the data stored in badge object, or returns query's result if Type is equal to 1

        Function: GetBadges()
        Parameters: BadgeType
        Purpose: Get all the badges saved in the database, If BadgeType is specified, select badges that equals to that BadgeType

        Function: RewardBadge()
        Parameters: BadgeID, StudentID
        Purpose: Gives student a badge. Push the RewardID(contains BadgeID, RewardType:Badge, DateRewarded:Date) into BadgesIDEarned which is a student attribute and adds the XP / Points to the student

        Function: RewardHouseBadge()
        Parameters: HouseID, StudentID
        Purpose: Gives House a badge. Push the RewardID(contains BadgeID, RewardType:Badge, DateRewarded:Date) into HouseBadgesIDEarned which is a house attribute and adds the XP / Points to the house

        Function: RemoveBadge()
        Parameters: RewardID, StudentID
        Purpose: Removes a badge from a student. Splices the RewardID from BadgesIDEarned and Destroys the Reward Object and subtracts the XP / Points from the student

        Function: RemoveHouseBadge()
        Parameters: RewardID, HouseID
        Purpose: Removes a badge from a student. Splices the RewardID from HouseBadgesIDEarned and Destroys the Reward Object and subtracts the XP / Points from the house

        Function: GetUnacquiredBadges()
        Paramaters: StudentID
        Purpose: Returns student missing badges with the BadgeType of Student

        Function: GetUnacquiredHouseBadges()
        Paramaters: HouseID
        Purpose: Returns house missing badges with the BadgeType of House

    TROPHY ENTITY
        Function: AddTrophy()
        Parameters: TrophyName, TrophyDescription, TrophyPoints, TrophyImage, TrophyType : ("Student", "House", "Ultimate"), BadgesIDNeeded : [Array of BadgesID], TrophyImageName : base64, TrophyDesignInspiration
        Purpose: Save the Trophy object into the database

        Function: afterSave(Trophy)
        Parameters:
        Purpose: Calls VerifyTrophyEligibility or VerifyTrophyRemoval upon editing BadgesIDNeeded

        Function: EditTrophy()
        Parameters: TrophyID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the Trophy

        Function: DeleteTrophy()
        Parameters: TrophyID
        Purpose: Delete the Trophy from the database

        Function: GetTrophyData()
        Parameters: TrophyID, Type
        Purpose: Retrieve the data stored in Trophy object, or returns query's result if Type is equal to 1

        Function: GetTrophies()
        Parameters: TrophyType
        Purpose: Get all the trophies saved in the database, If TrophyType is specified, select trophies that equals to that TrophyType 

        Function: VerifyTrophyEligibility()
        Parameters: StudentID
        Purpose: Check if the student is eligible to be awarded a trophy. Check the student array of BadgesIDEarned to know if all badges under one trophy are already earned

        Function: VerifyTrophyRemoval()
        Parameters: StudentID
        Purpose: Check if trophy should be removed upon removing badge

        Function: VerifyHouseTrophyEligibility()
        Parameters: HouseID
        Purpose: Check if the house is eligible to be awarded a trophy. Check the house array of HouseBadgesIDEarned to know if all HouseBadges under one HouseTrophy are already earned

        Function: VerifyHouseTrophyRemoval()
        Parameters: HouseID
        Purpose: Check if HouseTrophy should be removed upon removing HouseBadge

        Function: RewardTrophy()
        Paramaters: TrophyID, StudentID
        Purpose: Gives student a trophy. Push the RewardID(contains TrophyID, RewardType:Trophy, DateRewarded:Date) into TrophiesIDUnlocked which is a student attribute and adds the XP / Points to the student

        Function: RewardHouseTrophy()
        Paramaters: TrophyID, HouseID
        Purpose: Gives house a trophy. Push the RewardID(contains TrophyID, RewardType:Trophy, DateRewarded:Date) into HouseTrophiesIDUnlocked which is a house attribute and adds the XP / Points to the house

        Function: RemoveTrophy()
        Parameters: RewardID, StudentID
        Purpose: Removes a badge from a student. Splices the RewardID from BadgesIDEarned and Destroys the Reward Object and subtracts the XP / points to the student

        Function: RemoveHouseTrophy()
        Parameters: RewardID, HouseID
        Purpose: Removes a badge from a student. Splices the RewardID from BadgesIDEarned and Destroys the Reward Object and subtracts the XP / points to the student

        Function: VerifyUltimateTrophy()
        Parameters: StudentID
        Purpose: Rewards student an ultimate trophy if all trophies are earned. (If there is no ultimate trophy, it creates a new one with type of "Ultimate" and has no image and points, this is named as "Ultimate Trophy"). The admin can create an Ultimate Trophy by setting the trophies' type by "Ultimate". Or the admin can edit the automatically created Ultimate Trophy. There should be only one Trophy with type of Ultimate.

        Function: VerifyUltimateTrophyExists()
        Parameters: None
        Purpose: Checks if an ultimate trophy is already in the database. Returns true or false

        Function: GetUnacquiredTrophies()
        Parameters: StudentID
        Purpose: Gives student missing trophies

        Function: GetUnacquiredHouseTrophies()
        Parameters: HouseID
        Purpose: Gives house missing trophies with TrophyType of House

    UNIT ENTITY
        Function: AddUnit()
        Parameters: UnitName, UnitContactNumber, UnitType (whether unit is Teaching/Nonteaching)
        Purpose: Save the unit object into the database

        Function: EditUnit()
        Parameters: UnitID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the Unit

        Function: DeleteUnit()
        Parameters: UnitID
        Purpose: Delete the Trophy from the database. Check first if there are teachers/nt_distributors that belong to the unit object, if yes, throw an error.

        Function: GetUnitData()
        Parameters: UnitD, Type
        Purpose: Retrieve the data stored in unit object, or returns query's result if Type is equal to 1

        Function: GetUnits()
        Parameters: 
        Purpose: Get all the units saved in the database

    DEGREE ENTITY
        Function: AddDegree()
        Parameters:DegreeName, DegreeUnitIDPointer
        Purpose: Save the degree object into the database

        Function: EditDegree()
        Parameters: DegreeID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the Degree

        Function: DeleteDegree()
        Parameters: DegreeID
        Purpose: Delete the Degree from the database. Check first if there are students  that have this degree, if yes, throw an error.

        Function: GetDegreeData()
        Parameters: DegreeID, Type
        Purpose: Retrieve the data stored in Degree object, or returns query's result if Type is equal to 1

        Function: GetDegrees()
        Parameters: 
        Purpose: Get all the degrees saved in the database

    COURSE ENTITY
        Function: AddCourse()
        Parameters: CourseName, CourseCode, CourseDegreesIDPointers
        Purpose: Save the Course object into the database

        Function: EditCourse()
        Parameters: CourseID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the Course

        Function: DeleteCourse()
        Parameters: CourseID
        Purpose: Delete the Course from the database. Check first if there are students  that have this course, if yes, throw an error.

        Function: GetCourseData()
        Parameters: CourseID, Type
        Purpose: Retrieve the data stored in Course object, or returns query's result if Type is equal to 1

        Function: GetCourses()
        Parameters: 
        Purpose: Get all the courses saved in the database. If CourseDegreeID is specified, then it returns all courses that needs that degree(Exception to electives)


    COSMETIC ENTITY
        Function: AddCosmetic()
        Parameters:  CosmeticType, CosmeticName, CosmeticImage : base64, CosmeticImageName
        Purpose: Save the cosmetic object into the database. Specify first the type of cosmetic (avatar, frame, background).

        Function: EditCosmetic()
        Parameters: CosmeticID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the Cosmetic

        Function: DeleteCosmetic()
        Parameters: CosmeticID
        Purpose: Delete the Cosmetic from the database. Check first if this is a default cosmetic, if yes, throw an error. 

        Function: GetCosmeticData()
        Parameters: CosmeticID, Type
        Purpose: Retrieve the data stored in cosmetic object, or returns query's result if Type is equal to 1

        Function: GetCosmetics()
        Parameters: 
        Purpose: Get all the cosmetics saved in the database if CosmeticType is not specified. Else, return cosmetics of CosmeticType.

        Function: SetDefaultCosmetic()
        Parameters: CosmeticType, CosmeticID
        Purpose: Set a cosmetic of type CosmeticType as the default cosmetic
        
        Function: GetUnacquiredCosmetic()
        Parameters: CosmeticType, StudentID
        Purpose: Returns cosmetics with CosmeticType that are still not unlocked by student.


    ASCENSION TITLE ENTITY
        Function: AddAscensionTitle()
        Parameters:  AscensionName, AscensionXpRangeCap, AscensionXpRangeStart 
        Purpose: Save the ascension title object into the database

        Function: EditAscensionTitle()
        Parameters: AscensionId, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the AscensionTitle

        Function: UpdateAscensionTitle()
        Parameters: AscensionID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the AscensionTitle

        Function: DeleteAscensionTitle()
        Parameters: AscensionTitleID
        Purpose: Delete the AscensionTitle from the database

        Function: GetAscensionTitleData()
        Parameters: AscensionTitleID, Type
        Purpose: Retrieve the data stored in AscensionTitle object, or returns query's result if Type is equal to 1

        Function: GetAscensionTitles()
        Parameters: 
        Purpose: Get all the Ascension Titles saved in the database.

        Function: SearchAscensionTitleFromXp()
        Parameters: XpInput
        Purpose: Get the AscensionTitle based on the input xp

    HOUSE ENTITY
        Function: AddHouse()
        Parameters:  HouseName, HouseBannerIDPointer
        Purpose: Save the house object into the database

        Function: afterSave(House)
        Parameters:  HousePopulation, HouseXP, HouseTrophiesIDUnlocked, HouseBadgesIDEarned
        Purpose: Add the remaining attributes only after the house object is saved

        Function: EditHouse()
        Parameters: HouseID, Attribute/s to be edited, New value 
        Purpose: Edit the attribute/s of the house

        Function: DeleteHouse()
        Parameters: HouseID
        Purpose: Delete the House from the database if house population is zero

        Function: GetHouseData()
        Parameters: HouseID, Type
        Purpose: Retrieve the data stored in House object, or returns query's result if Type is equal to 1

        Function: GetHouses()
        Parameters: 
        Purpose: Get all the Houses saved in the database.

        Function: ChangeHouseBanner()
        Parameters: HouseID, BannerID
        Purpose: Change the banner of the house

        Function: ModifyHouseXP()
        Parameters: HouseID, XP
        Purpose: Compute the total xp of the members of the house

        Function: AddHouseMember()
        Parameters: HouseID, StudentID
        Purpose: Add the student as a member of the house. Change the banner of the student according to the house banner. Add 1 to the total population of the house

        Function: DeleteHouseMember()
        Parameters: HouseID, StudentID
        Purpose: Remove the student as a member of the house. Minus 1 to the total population of the house

        Function: GetHouseLeaderboard()
        Parameters: HouseID, Count (max number of students)
        Purpose: Returns list of students sorted by xp and firstname, with limit of "Count"

    REQUEST ENTITY
        Function: AddRequest()
        Parameters: ToRequestID, ToRequestType, Proof, StudentIDPointer 
        Purpose: Save the Request object into the database

        Function: EditRequest()
        Parameters: RequestID, Attribute/s to be edited, New value 
        Purpose: Edit the attribute/s of the house

        Function: DeleteRequest()
        Parameters: RequestID
        Purpose: Delete the Request from the database

        Function: GetRequestData()
        Parameters: RequestID, Type
        Purpose: Retrieve the data stored in Request object, or returns query's result if Type is equal to 1

        Function: GetRequests()
        Parameters: 
        Purpose: Get all the Requests saved in the database.

        Function: ApproveRequest()
        Parameters: RequestID, BadgeID
        Purpose: Deletes the requests and rewards the badge

    ANNOUNCEMENT ENTITY
        Function: AddAnnouncement()
        Parameters: AnnouncementText, UserIDPointer, HouseIDPointer
        Purpose: Saves an announcement object to the database

        Function: beforeSave(Announcement)
        Parameters:  UserIDPointer
        Purpose: Verifies if the UserID is not a student. (Only non-student users can make announcements)

        Function: EditAnnouncement()
        Parameters: AnnouncementID, AnnouncementText, UserIDPointer, HouseIDPointer
        Purpose: Edit the attribute/s of the announcement

        Function: DeleteAnnouncement()
        Parameters: AnnouncementID
        Purpose: Delete the Announcement from the database

        Function: GetAnnouncementData()
        Parameters: AnnouncementID, Type
        Purpose: Retrieve the data stored in Announcement object, or returns query's result if Type is equal to 1

        Function: GetAnnouncements()
        Parameters: 
        Purpose: Get all the Announcements saved in the database.

    OTHER FUNCTIONS
        Function: GetRewardData()
        Parameters: RewardID
        Purpose: automatically gives details about the trophy/badge stored in "RewardData"

        Function: GetStaffEmails()
        Parameters: Directory leading to the JSON file (e.g "C:\\Dev_Projects\\teaching.json")
        Purpose: Gets the content of the JSON file and returns an object

        Function: IdentifyUserType()
        Parameters: teacherEmails, nt_DistributorEmails, email  (third parameter is the current user's email)
        Purpose: Checks if the current user is a teacher, NT_Distributor or a student. Returns "Teacher", "Student", or "NT_Distributor"
