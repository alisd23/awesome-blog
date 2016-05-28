/**
 * Gets the path to the avatar image or a placeholder
 */
export const getAvatarURL = (user) =>
  user.avatar
    ? `/assets/images/avatars/${user.avatar}.jpg`
    : `/assets/images/avatars/placeholder.jpg`;

export const getFullname = (user) =>
  `${user.firstname}${user.lastname ? ` ${user.lastname}` : ''}`;

export const getTwitterURL = (user) =>
  user.twitter ? `https://twitter.com/${user.twitter}` : ``;
