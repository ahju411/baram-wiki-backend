import { DataTypes } from 'sequelize';

export default (sequelize) => {
	return sequelize.define(
		'ItemComp',
		{
			comp_id: {
				type: DataTypes.CHAR(50),
				primaryKey: true,
				allowNull: false,
				comment: '아이템 조합 고유 ID',
			},
			item_id: {
				type: DataTypes.CHAR(50),
				primaryKey: true,
				allowNull: false,
				comment: '아이템 고유 ID',
			},
			vals: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: '아이템 개수',
			},
		},
		{
			timestamps: false,
		}
	);
};
