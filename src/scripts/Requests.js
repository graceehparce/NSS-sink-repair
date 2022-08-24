import { getRequests, saveCompletion } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `<ul class="bigList">`
    html += `<h2>Service Requests</h2>`
    for (let request of requests) {
        html += `<li class="orderItem">${request.description}
        <select class="plumbers" id="plumbers">
            <option value="plumberDropDown">Choose</option>
            ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
            }
       </select>`
        html += `<button class="request__delete"
        id = "request--${request.id}" >
            Delete
                    </button >
                 </li > `
    }
    html += `</ul > `


    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const userRequestId = requestId
            const userPlumberChoice = plumberId
            const userDateCreated = Date.now()

            const completion = {
                requestId: userRequestId,
                plumberId: userPlumberChoice,
                date_created: userDateCreated
            }

            saveCompletion(completion)
        }
    }
)


