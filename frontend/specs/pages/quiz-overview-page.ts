import type { Page } from '@playwright/test'

export class QuizOverviewPage {
    constructor(private page: Page) {}

    checkboxLocator = () => this.page.locator('#configuration-checkbox')
    setCheckboxValue = (value: boolean) => this.checkboxLocator().setChecked(value)

    saveButtonLocator = () => this.page.locator('#save')
}
