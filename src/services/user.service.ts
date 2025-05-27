import bcrypt from 'bcrypt';
import { User } from '../database/models';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import nodemailer from 'nodemailer';

const SALT_ROUNDS = config.security.saltRounds ?? 10;
const JWT_EXPIRES_IN = config.security.jwtExpiresIn ?? '1h';
const PORT = config.mailing.smptPort;

export class UserService {
  /** Create a new user, throwing if the email is taken */
  async createUser(
    name: string,
    email: string,
    rawPassword: string,
    role: string
  ): Promise<User> {
    if (await this.findByEmail(email)) {
      throw boom.conflict('User with this email already exists');
    }

    const password = await bcrypt.hash(rawPassword, SALT_ROUNDS);

    return await User.create({
      name,
      email,
      password,
      role
    });
  }

  /**
   * Finds a user by their email address
   */
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: { email }
    });
  }

  /**
   * Validates user credentials
   * @returns User if credentials are valid, null otherwise
   */
  async validateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw boom.unauthorized('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.toJSON().password
    );

    if (!isPasswordValid) {
      throw boom.unauthorized('Invalid email or password');
    }

    return user.toJSON();
  }

  async signToken(user: User): Promise<string> {
    console.log('Service User: ', user);
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, config.security.jwtSecret, {
      expiresIn: JWT_EXPIRES_IN as any
    });
  }

  async sendRecoveryEmail(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw boom.notFound('User not found');
    }

    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, config.security.jwtSecret, {
      expiresIn: '15m'
    });

    console.log('Hi Im here');
    await user.update({ recoveryToken: token });

    const recoveryUrl = `localhost/recovery?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: config.mailing.smptHost,
      port: PORT,
      secure: Number(PORT) === 465,
      auth: {
        user: config.mailing.user,
        pass: config.mailing.pass
      }
    });

    const mailOptions = {
      from: `"Recipe App Support" <${config.mailing.user}>`,
      to: email,
      subject: 'Password Recovery Instructions',
      text: `Hi ${user.name}, click the following link to reset your password: ${recoveryUrl}`,
      html: `
        <h3>Hello ${user.name},</h3>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${recoveryUrl}">${recoveryUrl}</a>
        <br><br>
        <small>This link will expire in 15 minutes. If you did not request this, please ignore this email.</small>
      `
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Recovery email sent:', info.messageId);

      return info.accepted;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw boom.internal('Failed to send recovery email');
    }
  }
}
