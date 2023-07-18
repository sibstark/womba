// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import User from "./User";

@Table({
    tableName: "posts"
})
class Post extends Model {
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
}

export default Post;
