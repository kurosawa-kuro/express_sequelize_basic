module.exports = (sequelize, DataTypes) => {
    const PostTag = sequelize.define('PostTag', {
        postTagId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        postId: DataTypes.INTEGER,
        tagId: DataTypes.INTEGER,
    }, {
        tableName: 'post_tags',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return PostTag;
}