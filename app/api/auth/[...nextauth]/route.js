import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/db";
import User from "@models/user";

function vietnameseToEnglish(text) {
  var dictionary = {
    á: "a",
    à: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ắ: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    â: "a",
    ấ: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    đ: "d",
    é: "e",
    è: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ế: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    í: "i",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ó: "o",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ố: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ớ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ú: "u",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ứ: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ý: "y",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
  };

  var result = "";
  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    if (dictionary[char]) {
      result += dictionary[char];
    } else {
      result += char;
    }
  }

  return result;
}

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        // serverless -> lambda -> dynamodb
        console.log("connecting to db");
        await connectToDB();

        //check if user is authenticated
        const isUserExist = await User.findOne({ email: profile.email });
        // if user is not authenticated, create a new user
        if (!isUserExist) {
          console.log(
            "🚀 ~ file: route.js:46 ~ sighIn ~ error:",
            profile.name?.replaceAll(" ", "").toLowerCase()
          );

          await User.create({
            email: profile.email,
            username: vietnameseToEnglish(
              profile.name?.replaceAll(" ", "").toLowerCase()
            ),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("🚀 ~ file: route.js:46 ~ sighIn ~ error:", error);
      }
    },
  },
});

export { handler as GET, handler as POST };
