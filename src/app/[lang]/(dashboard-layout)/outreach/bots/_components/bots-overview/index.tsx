import { botsOverviewData } from "../../_lib/data"
import { ActiveBots } from "./active-bots"
import { MessagesDelivered } from "./messages-delivered"
import { ResponseRate } from "./response-rate"

// import { TargetInvitesSent } from "./target-invites-sent"

export function BotsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-full md:grid-cols-4">
      <ActiveBots data={botsOverviewData.activeBots} />
      <MessagesDelivered data={botsOverviewData.messagesDelivered} />
      <ResponseRate data={botsOverviewData.responseRate} />
      {/* <TargetInvitesSent data={botsOverviewData.targetInvitesSent} /> */}
    </div>
  )
}
