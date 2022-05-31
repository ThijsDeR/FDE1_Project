import UserData from "../UserData.js"

const upgrades = document.querySelectorAll('ul#upgrades > li')

const userdata = new UserData();


upgrades.forEach(async (upgrade) => {
    const data = await userdata.getUpgrade(upgrade.id)
    const level = upgrade.querySelector('span.level')!
    const price = upgrade.querySelector('span.price')!
    const buyBtn = upgrade.querySelector('button.buy')!
    level.innerHTML = data.level
    price.innerHTML = data.price
    upgrade.querySelector('button')!.addEventListener('click', async () => {
        const upgrade_data = await userdata.upgrade(upgrade.id)
        if (upgrade_data.status === 200) {
            // worked
            const data = await userdata.getUpgrade(upgrade.id)
            level.innerHTML = data.level
            upgrade.innerHTML = data.price
            buyBtn.classList.add('bought')
            setTimeout(() => {
                buyBtn.classList.remove('bought')
            }, 1000)
        }
        else if (upgrade_data.status === 400) {
            buyBtn.classList.add('error')
            setTimeout(() => {
                buyBtn.classList.remove('error')
            }, 1000)
        }
    })
})