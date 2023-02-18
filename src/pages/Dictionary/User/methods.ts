export const prepareUserEditData = (userData: any) => {
    let newUserData = {...userData}
    if (userData.create_date) {
        delete newUserData.create_date
    }
    if (userData.update_date) {
        delete newUserData.update_date
    }
    if (userData.org_name) {
        delete newUserData.org_name
    }
    if (userData.Id) {
        delete newUserData.Id
    }
    return newUserData
}