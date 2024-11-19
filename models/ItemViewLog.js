import { DataTypes } from 'sequelize';

export default (sequelize) => {
	const ItemViewLog = sequelize.define(
		'ItemViewLog',
		{
			id: {
				type: DataTypes.BIGINT,
				autoIncrement: true,
				primaryKey: true,
			},
			item_id: {
				type: DataTypes.CHAR(50),
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			tableName: 'ITEM_VIEW_LOGS',
			timestamps: false,
			indexes: [
				{
					fields: ['created_at'],
				},
				{
					fields: ['item_id'],
				},
			],
		}
	);

	ItemViewLog.associate = (models) => {
		ItemViewLog.belongsTo(models.ItemMaster, {
			foreignKey: 'item_id',
			targetKey: 'id',
		});
	};

	return ItemViewLog;
};
