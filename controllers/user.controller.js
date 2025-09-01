import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js"
import uploadOnCloud from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const register = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if ([name, username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "All fields are required"
    )
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiError(409, "User with same email or username already existed!");
  };

  const localFilePath = req.files?.profile[0]?.path;

  if (localFilePath) {
    throw new ApiError(400, "Profile file is required");
  };

  const profileUploaded = await uploadOnCloud(localFilePath);

  if (!profileUploaded) throw new ApiError(400, "Profile not uploaded");

  const userDocumentCreated = await User.create({
    name,
    username,
    email,
    password,
    profile: profileUploaded?.url || ""
  });

  const isUserCreatedInDB = User.findById(userDocumentCreated._id).select(
    "-password -refreshToken"
  );

  if (!isUserCreatedInDB) ApiError(500, "Something went wrong while registering the user");

  return new res.status(201).json(
    new ApiResponse(201, "User registered successfully!")
  );
});

export { register }