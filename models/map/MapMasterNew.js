import { DataTypes } from 'sequelize';

export default (sequelize) => {
	return sequelize.define(
		'MapMasterNew',
		{
			id: {
				type: DataTypes.CHAR(50),
				primaryKey: true,
			},
			name: DataTypes.STRING(300),
			group: DataTypes.CHAR(50),
			images: DataTypes.CHAR(50),
			width: DataTypes.INTEGER,
			height: DataTypes.INTEGER,
			main: DataTypes.CHAR,
			hunt: DataTypes.CHAR(2),
		},
		{
			tableName: 'MAP_MASTER_NEW',
			timestamps: false,
		}
	);
};
