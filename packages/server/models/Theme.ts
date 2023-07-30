import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";

import User from "./User";

export enum ETheme {
    DARK = "dark",
    LIGHT = "light"
}

@Table({
    tableName: "themes"
})
class Theme extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    override id!: number;

    @Column(DataType.ENUM(ETheme.DARK, ETheme.LIGHT))
    theme!: ETheme;

    @ForeignKey(() => {
        return User;
    })
    @Column({
        type: DataType.INTEGER
    })
    userId!: number;

    @BelongsTo(() => {
        return User;
    })
    user!: User;
}

export default Theme;
