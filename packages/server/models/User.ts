import bcrypt from "bcrypt";
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Comment from "./Comment";
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Post from "./Post";
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Reply from "./Reply";

@Table({
    tableName: "users"
})
class User extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    override id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "You should provide a valid email"
            },
            notEmpty: {
                msg: "Email is required"
            }
        }
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
            notEmpty: {
                msg: "Password is required"
            },
            len: {
                args: [5, 20],
                msg: "Password should be from 5 to 20 characters long"
            }
        }
    })
    password!: string;

    @HasMany(() => {
        return Post;
    })
    post!: Post;

    @HasMany(() => {
        return Comment;
    })
    comment!: Comment;

    @HasMany(() => {
        return Reply;
    })
    reply!: Reply;

    static async login({ email, password }: { email: string; password: string }) {
        const user = await this.findOne({ where: { email } });

        if (user) {
            const auth = await bcrypt.compare(password, user.password);

            if (auth) {
                return user;
            }

            throw new Error("Incorrect password");
        }

        throw new Error("Incorrect email");
    }
}

export const userBeforeCreate = () => {
    User.beforeCreate(async user => {
        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(user.password, salt);

        user.password = hashedPassword;
    });
};

export default User;
