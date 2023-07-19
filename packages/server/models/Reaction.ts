// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Reply from "./Reply";
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import User from "./User";
@Table({
    tableName: "reactions"
})
class Reaction extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    override id!: number;

    @Column({
        type: DataType.STRING
    })
    reaction!: string;

    @ForeignKey(() => {
        return User;
    })
    @Column({
        type: DataType.INTEGER
    })
    userId!: number;

    @ForeignKey(() => {
        return Reply;
    })
    @Column({
        type: DataType.INTEGER
    })
    replyId!: number;
}

export default Reaction;
