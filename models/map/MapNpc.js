/**
 * 
 * -- auto-generated definition
create table MAP_NPC
(
    id       int auto_increment
        primary key,
    npc_id   int          null,
    map_id   varchar(6)   null,
    x_coord  int          null,
    y_coord  int          null,
    side     tinyint      null,
    npc_name varchar(255) null
);


 */

import { DataTypes } from 'sequelize';

export default (sequelize) => {
	return sequelize.define(
		'MapNpc',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			npc_id: DataTypes.INTEGER,
			map_id: DataTypes.CHAR(6),
			x_coord: DataTypes.INTEGER,
			y_coord: DataTypes.INTEGER,
			side: DataTypes.TINYINT,
			npc_name: DataTypes.STRING(255),
		},
		{
			tableName: 'MAP_NPC',
			timestamps: false,
		}
	);
};
