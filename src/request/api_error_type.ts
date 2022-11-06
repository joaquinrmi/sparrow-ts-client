enum APIErrorType
{
    InternalServerError = 1000,
    InvalidForm = 1200,
    InvalidHandle = 1301,
    InvalidEmail = 1302,
    InvalidPassword = 1303,
    InvalidFullName = 1304,
    InvalidBirthdate = 1305,
    InvalidContent = 1306,
    InvalidResponseTarget = 1307,
    InvalidQuoteTarget = 1308,
    InvalidGallery = 1309,
    UnavailableHandle = 1400,
    UnavailableEmail = 1401,
    InvalidCredentials = 1500,
    InvalidParams = 1600,
    InvalidUserIdParam = 1601,
    InvalidNextToParam = 1602,
    InvalidCheepIdParam = 1603,
    InvalidNameOrHandleParam = 1604,
    InvalidUserHandleParam = 1605,
    InvalidWordsParam = 1606,
    InvalidResponsesParam = 1607,
    InvalidOnlyGalleryParam = 1608,
    InvalidResponseOfParam = 1609,
    InvalidQuoteTargetParam = 1610,
    InvalidRecheepTargetParam = 1611,
    InvalidBirthdateParam = 1612,
    UserDoesNotExist = 1700,
    ProfileDoesNotExist = 1701,
    InsufficientPermissions = 1800,
    RecheepAlreadyExists = 1900,
    CheepDoesNotExist = 2000
}

export default APIErrorType;