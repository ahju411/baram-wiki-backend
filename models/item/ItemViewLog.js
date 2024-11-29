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
			ip_address: {
				type: DataTypes.STRING(45),
				allowNull: true,
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: sequelize.fn('NOW'),
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
