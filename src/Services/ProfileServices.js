export const isFollowing = (followingList, userId) => {
    console.log("followingList from profileservices", followingList)
    return followingList !== undefined && Array.isArray(followingList) ? followingList.find(item => item._id == userId) ? true : false : false
}