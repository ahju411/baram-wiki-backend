import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('ItemMaster', {
    id: {
      type: DataTypes.CHAR(50),
      primaryKey: true,
      allowNull: false,
      comment: '아이템 고유 ID',
    },
    bid: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
      comment: 'Bid 고유값',
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '아이템 코드',
    },
    name: {
      type: DataTypes.CHAR(50),
      unique: true,
      allowNull: true,
      comment: '아이템 이름',
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '아이템 타입 코드',
    },
    iconId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '아이콘 ID',
    },
    iconUrl: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '아이콘 URL',
    },
    avatarId: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: 'None',
      comment: '아바타 ID',
    },
    dye: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '염색 값',
    },
    maxquan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '최대 수량',
    },
    maxdura: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '최대 내구도',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '가격',
    },
    reqmight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '필요한 마이트',
    },
    reqwill: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '필요한 윌',
    },
    reqgrace: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '필요한 그레이스',
    },
    reqgender: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '필요한 성별',
    },
    reqlevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '필요한 레벨',
    },
    reqjob: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '필요한 직업',
    },
    ondead: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '사망 시 효과',
    },
    trade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '거래 가능 여부',
    },
    repair: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '수리 가능 여부',
    },
    repairprice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '수리 가격',
    },
    storageprice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '저장 가격',
    },
    namingprice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '이름 지정 가격',
    },
    desc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'None',
      comment: '아이템 설명',
    },
    smin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'smin 값',
    },
    smax: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'smax 값',
    },
    lmin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'lmin 값',
    },
    lmax: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'lmax 값',
    },
    ac: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'AC 값',
    },
    MHP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'MHP 값',
    },
    MMP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'MMP 값',
    },
    hit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '명중률',
    },
    dam: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '피해량',
    },
    M: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'M 값',
    },
    W: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'W 값',
    },
    G: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'G 값',
    },
    hr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'hr 값',
    },
    md: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'md 값',
    },
    swingsound: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '스윙 사운드',
    },
  }, {
    tableName: 'ITEM_MASTER',
    timestamps: false,
  });
};
