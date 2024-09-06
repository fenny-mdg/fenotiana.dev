import * as ftp from "basic-ftp";
import { Stream } from "stream";

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_FOLDER } = process.env;

const getFtpClient = async () => {
  const client = new ftp.Client();

  try {
    await client.access({
      host: FTP_HOST,
      secure: false,
      user: FTP_USER,
      password: FTP_PASSWORD,
    });

    console.log("Connected to FTP server");

    return client;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const downloadFileToBase64 = async (filename: string) => {
  try {
    const client = await getFtpClient();
    const readable = new Stream.Readable({
      read(this) {},
    });
    const writable = new Stream.Writable({
      write(chunk, encoding, next) {
        readable.push(chunk);
        next();
      },
    });
    let base64 = "";

    writable.on("finish", () => {
      base64 = Buffer.from(
        String.fromCharCode(...new Uint8Array(readable.read())),
        "binary"
      ).toString("base64");
    });

    await client.downloadTo(writable, `${FTP_FOLDER}/${filename}`);

    client.close();
    return base64;
  } catch (error) {
    console.log(error);
  }
};
