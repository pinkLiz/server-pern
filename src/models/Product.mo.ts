import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

class Product extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name: String

    @Column({
        type: DataType.DECIMAL(6,2)
    })
    declare price: Number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN()
    })
    declare availibility: Boolean
}

export default Product