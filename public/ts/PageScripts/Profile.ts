import UserData from "../UserData.js"

const skins = document.querySelectorAll('#skins .skin')

const userdata = new UserData();


skins.forEach(async (skin) => {
    const skinBtns = skin.querySelectorAll('button')!;
    const skinType = skin.getAttribute('type')!;
    console.log(skinType)
    const skinImage = skin.querySelector('img')!
    skinBtns.forEach(async (skinBtn) => {
        console.log('sheesh')
        const btnType = skinBtn.getAttribute('type')!;
        skinBtn.addEventListener('click', async () => {
            let skinBtn_data: any;
            if (btnType === 'previous') skinBtn_data = await userdata.changeSkin(skinType, -1);
            else if (btnType === 'next') skinBtn_data = await userdata.changeSkin(skinType, 1);

            console.log(skinBtn_data.status)
            
            if (skinBtn_data!.status === 200) {
                // worked
                const skinData = await userdata.getSkin(skinType)
                console.log(skinData)

                skinImage.src = skinData.src

            }
            else if (skinBtn_data.status === 400) {

            }
        })
    })

})