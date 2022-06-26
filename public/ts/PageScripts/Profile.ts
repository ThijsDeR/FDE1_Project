import UserData from "../UserData.js"

const skins = document.querySelectorAll('#skins .skin')

const userdata = new UserData();


skins.forEach(async (skin) => {
    const skinBtns = skin.querySelectorAll('button')!;
    const skinType = skin.getAttribute('type')!;
    const skinImage = skin.querySelector('img')!
    skinBtns.forEach(async (skinBtn) => {
        const btnType = skinBtn.getAttribute('type')!;
        skinBtn.addEventListener('click', async () => {
            let skinBtn_data: any;
            if (btnType === 'previous') skinBtn_data = await userdata.changeSkin(skinType, -1);
            else if (btnType === 'next') skinBtn_data = await userdata.changeSkin(skinType, 1);

            
            if (skinBtn_data!.status === 200) {
                // worked
                const skinData = await userdata.getSkin(skinType)

                skinImage.src = skinData.src

                if (skinType === 'stamina') {
                    const baseStamina = skin.querySelector('#baseStamina')!
                    baseStamina.innerHTML = skinData.baseStamina
                }

            }
            else if (skinBtn_data.status === 400) {

            }
        })
    })

})