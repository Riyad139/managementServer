import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
import user from "../Models/users";
import company from "../Models/CompanyModel";
import meetings from "../Models/meetings";
import Task from "../Models/TaskModel";
import Dayjs from "dayjs";

export const createGuestUser: Controller = async (req, res, next) => {
  try {
    const password = req.body.password;
    const hashed = await argon.hash(password);
    const us = {
      name: req.body.userName,
      email: req.body.email,
      password: hashed,
    };
    const client = await user.create(us);
    const data = {
      id: client._id,
    };

    const token = jwt.sign(data, process.env.SALT as string, {
      expiresIn: "30d",
    });

    res.cookie("access-token", token, {
      expires: Dayjs().add(30, "day").toDate(),
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    res.status(200).send("welcome");
  } catch (error: any) {
    res.status(501).send("error");
  }
};

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const createDummydata: Controller = async (req, res, next) => {
  try {
    const data = {
      domain: "google.com",
      name: "google",

      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/teamlogos-2e4d9.appspot.com/o/logos%2FKnbkHKDbUNvUElbr25eZq-google-logo.png?alt=media&token=a6eba083-a91e-4b53-a54a-a574979a97e4",
      projects: ["640446d85692dfcdd6367654", "640474579bfd3566dbfda7ba"],
      members: [
        {
          userId: req.userr._id,
          role: "admin",
        },
        {
          userId: "64042aba06a2eec991324658",
          role: "member",
        },
        {
          userId: "64042d4806a2eec99132475d",
          role: "member",
        },
        {
          userId: "64042e1706a2eec9913248d8",
          role: "member",
        },
        {
          userId: "64042eaa06a2eec99132499b",
          role: "member",
        },
        {
          userId: "64042f6106a2eec991324a0a",
          role: "member",
        },
      ],
    };
    const data2 = {
      domain: "slack.com",
      name: "slack",
      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/teamlogos-2e4d9.appspot.com/o/logos%2FILjXaVxGUuRE8bRuaC9GM-slack.jpg?alt=media&token=8d3c63db-2ec9-49a8-a38e-93b0db20f847",
      projects: ["64044c845692dfcdd6367f78", "640477d49bfd3566dbfdc0a2"],
      members: [
        {
          userId: req.userr._id,
          role: "admin",
        },
        {
          userId: "6404337c06a2eec991324cd9",
          role: "member",
        },
        {
          userId: "640432ce06a2eec991324bbc",
          role: "member",
        },
        {
          userId: "6404321206a2eec991324b53",
          role: "member",
        },
        {
          userId: "6404318b06a2eec991324ae8",
          role: "member",
        },
        {
          userId: "6404308606a2eec991324a73",
          role: "member",
        },
      ],
    };
    await company.insertMany([data, data2]);

    res.status(200).send("yeh");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
