const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsToMany(models.User, { as: 'user', foreignKey: 'userId'});
  };

  return BlogPost
};

module.exports = BlogPost;