import { test as base, createBdd } from 'playwright-bdd'
import { QuizmasterWorld } from './world/world.ts'
import { mcr } from './coverage/mcr.config.ts'

export const test = base.extend<{ world: QuizmasterWorld }>({
    world: async ({ page }, use, testInfo) => {
        const world = new QuizmasterWorld(page, testInfo)
        await use(world)
    },
})

export const { Given, When, Then, BeforeScenario, AfterScenario, AfterAll } = createBdd(test, {
    worldFixture: 'world',
})

const ENABLE_COVERAGE = process.env.ENABLE_COVERAGE === '1'

BeforeScenario(async function () {
    if (!ENABLE_COVERAGE) return

    await this.page.coverage.startJSCoverage({
        resetOnNavigation: false,
    })
})

AfterScenario(async function () {
    if (!ENABLE_COVERAGE) return

    const jsCoverage = await this.page.coverage.stopJSCoverage()
    await mcr.add(jsCoverage)
})

AfterAll(async () => {
    if (!ENABLE_COVERAGE) return
    await mcr.generate()
})
