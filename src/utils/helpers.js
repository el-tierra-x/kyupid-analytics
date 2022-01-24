import { isEmpty } from "lodash";

export const parseUserData = (userData) => {
  const processedData = {};

  if (isEmpty(userData)) {
    return processedData;
  }

  userData?.forEach((item) => {
    const areaId = item?.area_id;
    const existingData = processedData[ areaId ];
    processedData[ areaId ] = processEachItem(item, existingData);
  })

  return processedData;
}


const processEachItem = (userItem, mapData) => {

  if (!mapData) {
    const data = initialiseNewArea(userItem);

    return data;
  }

  const { totalMatches, maleUsers, femaleUsers, proUsers, totalUsers, totalAge } = mapData;

  const isUserMaleBool = isUserMale(userItem?.gender);

  const newData = {
    totalMatches: totalMatches + (userItem?.total_matches ?? 0),
    maleUsers: isUserMaleBool ? maleUsers + 1 : maleUsers,
    femaleUsers: isUserMaleBool ? femaleUsers : femaleUsers + 1,
    proUsers: userItem?.is_pro_user ? proUsers + 1 : proUsers,
    totalUsers: totalUsers + 1,
    totalAge: userItem?.age + totalAge,
    area_id: userItem?.area_id
  }

  return newData;
}

const initialiseNewArea = (userItem) => {
  return {
    totalMatches: userItem?.total_matches ?? 0,
    maleUsers: isUserMale(userItem?.gender) ? 1 : 0,
    femaleUsers: isUserMale(userItem?.gender) ? 0 : 1,
    proUsers: userItem?.is_pro_user ? 1 : 0,
    totalUsers: 1,
    totalAge: userItem?.age ?? 0,
    areaId: userItem?.area_id
  }
}


const isUserMale = (gender) => {
  return gender === "M";
}
