export const checkLikedPost = (likedList, userId) => {
    // console.log("userId from postservice: ", userId, likedList)

    return likedList !== undefined ? likedList.includes(userId) : false
}