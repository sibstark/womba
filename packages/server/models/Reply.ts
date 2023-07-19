// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Comment from "./Comment";
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Post from "./Post";
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import User from "./User";

@Table({
    tableName: "replies"
})
class Reply extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    override id!: number;

    @Column({
        type: DataType.STRING
    })
    content!: string;

    @ForeignKey(() => {
        return User;
    })
    @Column({
        type: DataType.INTEGER
    })
    userId!: number;

    @ForeignKey(() => {
        return Post;
    })
    @Column({
        type: DataType.INTEGER
    })
    postId!: number;

    @ForeignKey(() => {
        return Comment;
    })
    @Column({
        type: DataType.INTEGER
    })
    commentId!: number;
}

export default Reply;
