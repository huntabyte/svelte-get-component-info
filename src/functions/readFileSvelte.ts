import { existsSync, readFileSync } from "fs"
import { toTry } from "@el3um4s/to-try"

import { Content } from "./interfaces"

function readFileSvelte(fileName: string) {
    const content: Content = {
        error: {
            status: true,
            content: "file not read",
        },
        content: {
            status: false,
            content: "",
        },
    }

    if (checkFileExist(fileName)) {
        const [result, error] = toTry(() => readFileSync(fileName))

        if (!error && result) {
            const contentString = result.toString()
            content.error = {
                status: false,
                content: "",
            }
            content.content = {
                status: true,
                content: contentString,
            }
        }
    } else {
        content.error.content = `File "${fileName}" not exist`
    }

    return content
}

function checkFileExist(fileName: string): boolean {
    return existsSync(fileName)
}

export { readFileSvelte, checkFileExist }
