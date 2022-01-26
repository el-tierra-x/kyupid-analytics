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
  });

  const overallData = parseTotalData(processedData);

  return {
    areaWiseData: processedData,
    overallData: overallData?.totalData,
    totalAreaArray: overallData?.totalAreaArray
  };
}


const processEachItem = (userItem, mapData) => {

  if (!mapData) {
    const data = initialiseNewArea(userItem);

    return data;
  }

  const {
    totalMatches,
    maleUsers,
    femaleUsers,
    proUsers,
    totalUsers,
    totalAge,
    maleProUsers,
    totalMaleAge,
    proUsersMatches } = mapData;

  const isUserMaleBool = isUserMale(userItem?.gender);

  const newData = {
    totalMatches: totalMatches + (userItem?.total_matches ?? 0),
    totalMaleMatches: isUserMaleBool ? userItem?.total_matches + totalMatches : totalMatches,
    proUsersMatches: userItem?.is_pro_user ? userItem?.total_matches + proUsersMatches : proUsersMatches,
    maleUsers: isUserMaleBool ? maleUsers + 1 : maleUsers,
    femaleUsers: isUserMaleBool ? femaleUsers : femaleUsers + 1,
    proUsers: userItem?.is_pro_user ? proUsers + 1 : proUsers,
    maleProUsers: isUserMaleBool && userItem?.is_pro_user ? maleProUsers + 1 : maleProUsers,
    totalUsers: totalUsers + 1,
    totalAge: userItem?.age + totalAge,
    totalMaleAge: isUserMaleBool ? totalMaleAge + userItem?.age : totalMaleAge,
    areaId: userItem?.area_id
  }

  return newData;
}

const initialiseNewArea = (userItem) => {
  return {
    totalMatches: userItem?.total_matches ?? 0,
    totalMaleMatches: isUserMale(userItem?.gender) ? userItem?.total_matches : 0,
    maleUsers: isUserMale(userItem?.gender) ? 1 : 0,
    femaleUsers: isUserMale(userItem?.gender) ? 0 : 1,
    proUsers: userItem?.is_pro_user ? 1 : 0,
    maleProUsers: isUserMale(userItem?.gender) && userItem?.is_pro_user ? 1 : 0,
    totalUsers: 1,
    totalAge: userItem?.age ?? 0,
    totalMaleAge: isUserMale(userItem?.gender) && userItem?.age ? userItem?.age : 0,
    proUsersMatches: userItem?.is_pro_user ? userItem?.total_matches : 0,
    areaId: userItem?.area_id
  }
}


const isUserMale = (gender) => {
  return gender === "M";
}


function parseTotalData(areaData) {
  let totalUsers = 0, totalProUsers = 0, totalMaleUsers = 0, totalFemaleUsers = 0, totalMaleProUsers = 0, totalAge = 0, totalMatches = 0, totalMaleMatches = 0;
  const totalAreaArray = Object.keys(areaData).map((key) => {
    const area = areaData[ key ];

    totalUsers += area?.totalUsers;
    totalProUsers += area?.proUsers;
    totalMaleUsers += area?.maleUsers;
    totalFemaleUsers += area?.femaleUsers;
    totalMaleProUsers += area?.maleProUsers;
    totalAge += area?.totalAge
    totalMatches += area?.totalMatches
    totalMaleMatches += area?.totalMaleMatches

    return areaData[ key ];
  });

  const totalData = {
    totalUsers,
    totalMatches,
    totalMaleMatches,
    totalProUsers,
    totalMaleUsers,
    totalFemaleUsers,
    totalMaleProUsers,
    totalAge
  }

  return {
    totalAreaArray,
    totalData
  }
}



export function addingCommasToNumber(x) {
  if (x != null) {
    let isNegativeNumber = false;

    x = x.toString();

    if (x.charAt(0) == '-') {
      x = x.substr(1);
      isNegativeNumber = true;
    }

    let afterPoint = '';

    if (x.indexOf('.') > 0) { afterPoint = x.substring(x.indexOf('.'), x.length); }

    x = Math.floor(x);
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);

    if (otherNumbers != '') { lastThree = ',' + lastThree; }

    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

    if (isNegativeNumber) {
      return '-' + res;

    } else {
      return res;
    }

  } else {
    return false;
  }

}
