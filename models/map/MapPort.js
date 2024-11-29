import { DataTypes } from 'sequelize';

export default (sequelize) => {
	return sequelize.define(
		'MapPort',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			f_map_id: DataTypes.CHAR(50),
			f_name: DataTypes.CHAR(50),
			f_xaxis: DataTypes.CHAR(50),
			f_yaxis: DataTypes.CHAR(50),
			b_map_id: DataTypes.CHAR(50),
			b_name: DataTypes.CHAR(50),
			b_xaxis: DataTypes.CHAR(50),
			b_yaxis: DataTypes.CHAR(50),
		},
		{
			tableName: 'MAP_PORT',
			timestamps: false,
		}
	);
};
