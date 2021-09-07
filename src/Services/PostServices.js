export const checkLikedPost = (likedList, userId) => {

    return likedList !== undefined ? likedList.includes(userId) : false
}