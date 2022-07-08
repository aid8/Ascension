# Ascension
# CLOUD FUNCTIONS
    STUDENT ENTITY
        Function: AddStudent()
        Parameters: FirstName, MiddleName, LastName, Email, ContactNumber, 
                    RegisterDate, YearLevel, StudentUnitIDPointer, 
                    StudentDegreeIDPointer, StudentCoursesIDPointer,
        Purpose: Save the student object into the database

        Function: afterSave(Student)
        Parameters: XP, AscensionPoints, BadgesIDEarned, TrophiesIDUnlocked, 
                    ChosenTrophies, AvatarsIDUnlocked, FrameIDUnlocked, 
                    BannerIDUnlocked, CoverPhotoIDUnlocked, AscensionTitle,
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
        Parameters: StudentID
        Purpose: Retrieve the data stored in student object

        Function: AssignHouse()
        Parameters: StudentID, HouseID
        Purpose: Set the student as a member of a house (random)

        Function: ChangeStudentHouse()
        Parameters: StudentID
        Purpose: Delete the student as a member of the previous house. Set the student as a member of another house 

        Function: ChangeTopTrophies()
        Parameters: StudentID, TrophyID_1, TrophyID_2, TrophyID_3
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
        Parameters: TeacherID
        Purpose: Retrieve the data stored in Teacher object

        Function: GetTeachers()
        Parameters: 
        Purpose: Get all the teachers saved in the database. Useful when in need of removing non-existing objects the teachers have relationship with, editing the attributes of teachers, or just checking the list of students

    BADGE ENTITY
        Function: AddBadge()
        Parameters: BadgeName, BadgeDescription, BadgePoints, BadgeImage
        Purpose: Save the badge object into the database

        Function: EditBadge()
        Parameters: BadgeID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the badge

        Function: DeleteBadge()
        Parameters: BadgeID
        Purpose: Delete the badge from the database

        Function: GetBadgeData()
        Parameters: BadgeID
        Purpose: Retrieve the data stored in badge object

        Function: GetBadges()
        Parameters: 
        Purpose: Get all the badges saved in the database

    TROPHY ENTITY
        Function: AddTrophy()
        Parameters: TrophyName, TrophyDescription, TrophyPoints, TrophyImage, TrophyCategory, TrophyBadgesIDNeeded
        Purpose: Save the Trophy object into the database

        Function: EditTrophy()
        Parameters: TrophyID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the Trophy

        Function: DeleteTrophy()
        Parameters: TrophyID
        Purpose: Delete the Trophy from the database

        Function: GetTrophyData()
        Parameters: TrophyID
        Purpose: Retrieve the data stored in Trophy object

        Function: GetTrophies()
        Parameters: 
        Purpose: Get all the trophies saved in the database

        Function: VerifyEligibility()
        Parameters: StudentID
        Purpose: Check if the student is eligible to be awarded a trophy. Check the student array of BadgesIDEarned to know if all badges under one trophy are already earned

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
        Parameters: UnitD
        Purpose: Retrieve the data stored in unit object

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
        Parameters: DegreeID
        Purpose: Retrieve the data stored in Degree object

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
        Parameters: CourseID
        Purpose: Retrieve the data stored in Course object

        Function: GetCourses()
        Parameters: 
        Purpose: Get all the courses saved in the database. If CourseDegreeID is specified, then it returns all courses that needs that degree(Exception to electives)


    COSMETIC ENTITY
        Function: AddCosmetic()
        Parameters:  CosmeticType, CosmeticName, CosmeticImage
        Purpose: Save the cosmetic object into the database. Specify first the type of cosmetic (avatar, frame, background).

        Function: EditCosmetic()
        Parameters: CosmeticID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the Cosmetic

        Function: DeleteCosmetic()
        Parameters: CosmeticID
        Purpose: Delete the Cosmetic from the database. Check first if this is a default cosmetic, if yes, throw an error. 

        Function: GetCosmeticData()
        Parameters: CosmeticID
        Purpose: Retrieve the data stored in cosmetic object

        Function: GetCosmetics()
        Parameters: 
        Purpose: Get all the cosmetics saved in the database if CosmeticType is not specified. Else, return cosmetics of CosmeticType.

        Function: SetDefaultCosmetic()
        Parameters: CosmeticType
        Purpose: Set a cosmetic of type CosmeticType as the default cosmetic

    ASCENSION TITLE ENTITY
        Function: AddAscensionTitle()
        Parameters:  AscensionName, AscensionXpRangeCap, AscensionXpRangeStart 
        Purpose: Save the ascension title object into the database

        Function: UpdateAscensionTitle()
        Parameters: AscensionID, Name of the attribute/s to be edited, 
                    New value/s of the attribute/s
        Purpose: Edit the attribute/s of the AscensionTitle

        Function: DeleteAscensionTitle()
        Parameters: AscensionTitleID
        Purpose: Delete the AscensionTitle from the database

        Function: GetAscensionTitleData()
        Parameters: AscensionTitleID
        Purpose: Retrieve the data stored in AscensionTitle object

        Function: GetAscensionTitles()
        Parameters: 
        Purpose: Get all the Ascension Titles saved in the database.

        Function: SearchAscensionTitleFromXp()
        Parameters: XpInput
        Purpose: Get the AscensionTitle based on the input xp

    HOUSE ENTITY
        Function: AddHouse()
        Parameters:  HouseName, HouseBannerIDPointer, AscensionXpRangeStart 
        Purpose: Save the house object into the database

        Function: afterSave(House)
        Parameters:  HousePopulation, HouseXP 
        Purpose: Add the remaining attributes only after the house object is saved

        Function: EditHouse()
        Parameters: HouseID, Attribute/s to be edited, New value 
        Purpose: Edit the attribute/s of the house

        Function: DeleteHouse()
        Parameters: HouseID
        Purpose: Delete the House from the database if house population is zero

        Function: GetHouseData()
        Parameters: HouseID
        Purpose: Retrieve the data stored in House object

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
