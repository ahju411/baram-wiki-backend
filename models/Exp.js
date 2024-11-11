import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define(
        'Exp',
        {
            level: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                comment: '레벨'
            },
            job: {
                type:DataTypes.CHAR(50),
                primaryKey: true,
                allowNull: false,
                comment: '직업'
            },
            exp: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: '필요 경험치'
            },
            total: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: '토탈 경험치'
            }
        },
        {
            tableName: 'EXP',
            timestamps: false,
        }
    );
};
