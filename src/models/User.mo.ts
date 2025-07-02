import { Table, Column, Model, DataType, Default, PrimaryKey, AutoIncrement, NotNull, IsEmail, Unique, AllowNull } from "sequelize-typescript";

@Table({
    tableName: 'users'
})

class User extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare id: number;


    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare username: string;


    @Unique
    @AllowNull(false)
    @IsEmail
    @Column({
        type: DataType.STRING(100)
    })
    declare email: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(255)
    })
    declare password: string;

    @Default('user')
    @Column({
        type: DataType.ENUM('user', 'admin')
    })
    declare role: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare isActive: boolean;


   
}

export default User