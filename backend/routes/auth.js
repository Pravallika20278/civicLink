const express = require("express");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");

const router = express.Router();

/*
====================================================
TWILIO CONFIGURATION
====================================================
*/

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


/*
====================================================
TEMPORARY OTP STORAGE
====================================================

For your college project/demo, OTPs are stored
temporarily in memory.

OTP expires after 5 minutes.

For a production application, use MongoDB or Redis.
====================================================
*/

const otpStore = new Map();


/*
====================================================
GENERATE 6-DIGIT OTP
====================================================
*/

function generateOTP() {

    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();

}


/*
====================================================
NORMALIZE PHONE NUMBER
====================================================

Accepts:

9876543210
919876543210
+919876543210

Converts them to:

+919876543210
====================================================
*/

function normalizePhone(phone) {

    if (!phone) {
        return null;
    }

    phone = phone.toString().trim();

    // Remove spaces, hyphens and brackets
    phone = phone.replace(/[\s\-()]/g, "");

    // 9876543210
    if (/^[6-9]\d{9}$/.test(phone)) {

        phone = "+91" + phone;

    }

    // 919876543210
    else if (/^91[6-9]\d{9}$/.test(phone)) {

        phone = "+" + phone;

    }

    // +919876543210
    else if (/^\+91[6-9]\d{9}$/.test(phone)) {

        // Already correct
        phone = phone;

    }

    else {

        return null;

    }

    return phone;

}


/*
====================================================
TEST ROUTE
====================================================

GET:

http://localhost:5000/api/auth/test
====================================================
*/

router.get("/test", (req, res) => {

    res.status(200).json({

        success: true,

        message:
            "CivicLink authentication route is working."

    });

});


/*
====================================================
SEND OTP
====================================================

POST:

/api/auth/send-otp

Body:

{
    "phone": "9876543210"
}
====================================================
*/

router.post("/send-otp", async (req, res) => {

    try {

        const { phone } = req.body;


        /*
        --------------------------------------------
        CHECK PHONE
        --------------------------------------------
        */

        if (!phone) {

            return res.status(400).json({

                success: false,

                message:
                    "Phone number is required."

            });

        }


        /*
        --------------------------------------------
        NORMALIZE PHONE
        --------------------------------------------
        */

        const normalizedPhone =
            normalizePhone(phone);


        if (!normalizedPhone) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid Indian mobile number."

            });

        }


        /*
        --------------------------------------------
        GENERATE OTP
        --------------------------------------------
        */

        const otp = generateOTP();


        /*
        --------------------------------------------
        STORE OTP
        --------------------------------------------
        */

        otpStore.set(normalizedPhone, {

            otp: otp,

            expiresAt:
                Date.now() + (5 * 60 * 1000),

            attempts: 0

        });


        /*
        --------------------------------------------
        SEND SMS USING TWILIO
        --------------------------------------------
        */

        const message =
            await twilioClient.messages.create({

                body:
                    `Your CivicLink verification OTP is ${otp}. It is valid for 5 minutes. Do not share this OTP with anyone.`,

                from:
                    process.env.TWILIO_PHONE_NUMBER,

                to:
                    normalizedPhone

            });


        /*
        --------------------------------------------
        SERVER LOG
        --------------------------------------------
        */

        console.log(
            "======================================"
        );

        console.log(
            "CIVICLINK OTP SENT"
        );

        console.log(
            "Phone:",
            normalizedPhone
        );

        console.log(
            "Twilio SID:",
            message.sid
        );

        console.log(
            "======================================"
        );


        /*
        --------------------------------------------
        SUCCESS RESPONSE
        --------------------------------------------
        */

        return res.status(200).json({

            success: true,

            message:
                "OTP sent successfully to your mobile number."

        });


    } catch (error) {

        console.error(
            "SEND OTP ERROR:"
        );

        console.error(error);


        return res.status(500).json({

            success: false,

            message:
                "Unable to send OTP. Please try again."

        });

    }

});


/*
====================================================
VERIFY OTP
====================================================

POST:

/api/auth/verify-otp

Body:

{
    "phone": "9876543210",
    "otp": "123456"
}
====================================================
*/

router.post("/verify-otp", async (req, res) => {

    try {

        const { phone, otp } = req.body;


        /*
        --------------------------------------------
        CHECK INPUT
        --------------------------------------------
        */

        if (!phone || !otp) {

            return res.status(400).json({

                success: false,

                message:
                    "Phone number and OTP are required."

            });

        }


        /*
        --------------------------------------------
        NORMALIZE PHONE
        --------------------------------------------
        */

        const normalizedPhone =
            normalizePhone(phone);


        if (!normalizedPhone) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid phone number."

            });

        }


        /*
        --------------------------------------------
        GET STORED OTP
        --------------------------------------------
        */

        const storedOTP =
            otpStore.get(normalizedPhone);


        if (!storedOTP) {

            return res.status(400).json({

                success: false,

                message:
                    "OTP not found or expired. Please request a new OTP."

            });

        }


        /*
        --------------------------------------------
        CHECK EXPIRATION
        --------------------------------------------
        */

        if (
            Date.now() >
            storedOTP.expiresAt
        ) {

            otpStore.delete(normalizedPhone);

            return res.status(400).json({

                success: false,

                message:
                    "OTP has expired. Please request a new OTP."

            });

        }


        /*
        --------------------------------------------
        CHECK MAXIMUM ATTEMPTS
        --------------------------------------------
        */

        if (
            storedOTP.attempts >= 5
        ) {

            otpStore.delete(normalizedPhone);

            return res.status(429).json({

                success: false,

                message:
                    "Too many incorrect attempts. Please request a new OTP."

            });

        }


        /*
        --------------------------------------------
        CHECK OTP
        --------------------------------------------
        */

        if (
            storedOTP.otp !==
            otp.toString().trim()
        ) {

            storedOTP.attempts++;

            return res.status(400).json({

                success: false,

                message:
                    "Incorrect OTP."

            });

        }


        /*
        --------------------------------------------
        OTP CORRECT
        --------------------------------------------
        */

        otpStore.delete(normalizedPhone);


        /*
        --------------------------------------------
        CREATE JWT
        --------------------------------------------
        */

        const token =
            jwt.sign(

                {
                    phone:
                        normalizedPhone

                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );


        /*
        --------------------------------------------
        SUCCESS
        --------------------------------------------
        */

        console.log(
            "OTP VERIFIED:",
            normalizedPhone
        );


        return res.status(200).json({

            success: true,

            message:
                "OTP verified successfully.",

            token: token,

            user: {

                phone:
                    normalizedPhone

            }

        });


    } catch (error) {

        console.error(
            "VERIFY OTP ERROR:"
        );

        console.error(error);


        return res.status(500).json({

            success: false,

            message:
                "Unable to verify OTP. Please try again."

        });

    }

});


/*
====================================================
EXPORT ROUTER
====================================================
*/

module.exports = router;