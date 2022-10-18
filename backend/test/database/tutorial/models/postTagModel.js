module.exports = (sequelize, DataTypes) => {
    const PostTags = sequelize.define('post_tags', {
        postId: DataTypes.INTEGER,
        tagId: DataTypes.INTEGER,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return PostTags;
}