module.exports = (sequelize, DataTypes) => {
    const Post_Tag = sequelize.define('post_tags', {
        postId: DataTypes.INTEGER,
        tagId: DataTypes.INTEGER,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Post_Tag;
}