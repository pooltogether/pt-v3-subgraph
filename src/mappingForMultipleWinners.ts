import {NumberOfWinnersSet} from "../generated/templates/MultipleWinners/MultipleWinners"

import { PeriodicPrizeStrategy } from "../generated/schema"


export function handleNumberOfWinnersSet(event: NumberOfWinnersSet) : void {
    let periodicPrizeStrategy = PeriodicPrizeStrategy.load(event.address.toHex())
    periodicPrizeStrategy.numberOfWinners = event.params.numberOfWinners
    periodicPrizeStrategy.save()
}