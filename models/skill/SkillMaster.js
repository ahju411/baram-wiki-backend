import { DataTypes } from 'sequelize';

export default (sequelize) => {
	return sequelize.define(
		'SkillMaster',
		{
			id: {
				type: DataTypes.CHAR(10),
				primaryKey: true,
			},
			name: {
				type: DataTypes.CHAR(50),
				allowNull: false,
			},
			level: {
				type: DataTypes.CHAR(10),
				allowNull: false,
			},
			job: {
				type: DataTypes.CHAR,
				allowNull: false,
			},
			advence: {
				type: DataTypes.CHAR,
				allowNull: false,
			},
			images: {
				type: DataTypes.CHAR(50),
				allowNull: false,
			},
			cool: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			information: {
				type: DataTypes.STRING(1000),
				defaultValue: '',
			},
		},
		{
			tableName: 'SKILL_MASTER',
			timestamps: false,
		}
	);
};
