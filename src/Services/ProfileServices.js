export const isFollowing = (followingList, userId) => {
    return followingList !== undefined && Array.isArray(followingList) ? followingList.find(item => item._id === userId) ? true : false : false
}