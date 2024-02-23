const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const { Users } = require("../models");
const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';

const userServices = {
    registration: async (body) => {
        const { firstName, lastName, mobileNumber, password } = body;
        try {
            const existingUserFirstName = await Users.findOne({
                where: {
                    first_name: firstName,
                },
            });

            if (existingUserFirstName) {
                return {
                    success: false,
                    error: "A user with this first name already exists.",
                };
            }
            const existingUserMobileNumber = await Users.findOne({
                where: {
                    mobile_number: mobileNumber,
                },
            });

            if (existingUserMobileNumber) {
                return {
                    success: false,
                    error: "A user with this mobile number already exists.",
                };
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await Users.create({
                first_name: firstName,
                last_name: lastName,
                mobile_number: mobileNumber,
                password: hashedPassword,
            });

            return { success: true, user: newUser };
        } catch (error) {
            console.error('Error in registration:', error.message);
            return { success: false, error: error.message };
        }
    },


    login: async (credentials) => {
        const { mobileNumber, password } = credentials;

        try {
            const user = await Users.findOne({ mobile_number: mobileNumber });

            if (!user) {
                return { success: false, error: "User not found" };
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return { success: false, error: "Invalid password" };
            }

            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            return { success: true, user, token };
        } catch (error) {
            console.error('Error in Login:', error.message);
            return { success: false, error: error.message };
        }
    },





};



module.exports = userServices;
