package com.knoldus.leader_board

import java.time.{LocalTime, ZoneId, ZonedDateTime}
import java.util.TimeZone

import akka.actor.{ActorSystem, Props}
import com.knoldus.leader_board.application.{ReputationOnAPI, ReputationOnAPIImpl}
import com.knoldus.leader_board.business._
import com.knoldus.leader_board.infrastructure._
import com.typesafe.akka.extension.quartz.QuartzSchedulerExtension
import com.typesafe.config.{Config, ConfigFactory}

import scala.concurrent.ExecutionContextExecutor
import scala.concurrent.duration._

object DriverApp extends App {
  val config: Config = ConfigFactory.load()
  implicit val system: ActorSystem = ActorSystem("leaderboard", config)
  implicit val executionContext: ExecutionContextExecutor = system.dispatcher


  val knolderScore: KnolderScore = new KnolderScoreImpl(config)
  val knolderRank: KnolderRank = new KnolderRankImpl
  val readBlog = new ReadBlogImpl(config)
  val readAllTimeReputation: ReadAllTimeReputation = new ReadAllTimeReputationImpl(config)
  val writeAllTimeReputation: WriteAllTimeReputation = new WriteAllTimeReputationImpl(config)
  val allTimeReputation: AllTimeReputation = new AllTimeReputationImpl(readBlog, knolderRank, knolderScore,
    readAllTimeReputation)
  val readMonthlyReputation: ReadMonthlyReputation = new ReadMonthlyReputationImpl(config)
  val writeMonthlyReputation: WriteMonthlyReputation = new WriteMonthlyReputationImpl(config)
  val monthlyReputationPerKnolder: MonthlyReputation = new MonthlyReputationImpl(readBlog, knolderRank, knolderScore,
    readMonthlyReputation)
  val readQuarterlyReputation: ReadQuarterlyReputation = new ReadQuarterlyReputationImpl(config)
  val writeQuarterlyReputation: WriteQuarterlyReputation = new WriteQuarterlyReputationImpl(config)
  val quarterlyReputation: QuarterlyReputation = new QuarterlyReputationImpl(readBlog, knolderScore,
    readQuarterlyReputation)
  val combineReputation: FetchReputation = new FetchReputationImpl(config)
  val reputationOnAPI: ReputationOnAPI = new ReputationOnAPIImpl(combineReputation, config)

  val allTimeReputations = allTimeReputation.getKnolderReputation
  writeAllTimeReputation.insertAllTimeReputationData(allTimeReputations)
  writeAllTimeReputation.updateAllTimeReputationData(allTimeReputations)

  val monthlyReputations = monthlyReputationPerKnolder.getKnolderMonthlyReputation
  writeMonthlyReputation.insertMonthlyReputationData(monthlyReputations)
  writeMonthlyReputation.updateMonthlyReputationData(monthlyReputations)

  val quarterlyReputations = quarterlyReputation.getKnolderQuarterlyReputation
  writeQuarterlyReputation.insertQuarterlyReputationData(quarterlyReputations)
  writeQuarterlyReputation.updateQuarterlyReputationData(quarterlyReputations)
  reputationOnAPI.displayReputationOnAPI

  val indiaCurrentTime = ZonedDateTime.now(ZoneId.of("Asia/Calcutta"))
  val totalSecondsOfDayTillCurrentTime = indiaCurrentTime.toLocalTime.toSecondOfDay
  val startTimeToCalculateAllTimeReputation = LocalTime.of(1, 0, 0, 0).toSecondOfDay
  val startTimeToCalculateMonthlyReputation = LocalTime.of(1, 0, 0, 0).toSecondOfDay
  val secondsInDay = 24 * 60 * 60

  val timeForAllTimeReputation =
    if (startTimeToCalculateAllTimeReputation - totalSecondsOfDayTillCurrentTime < 0) {
      secondsInDay + startTimeToCalculateAllTimeReputation - totalSecondsOfDayTillCurrentTime
    } else {
      startTimeToCalculateAllTimeReputation - totalSecondsOfDayTillCurrentTime
    }

  val timeForMonthlyReputation =
    if (startTimeToCalculateMonthlyReputation - totalSecondsOfDayTillCurrentTime < 0) {
      secondsInDay + startTimeToCalculateMonthlyReputation - totalSecondsOfDayTillCurrentTime
    } else {
      startTimeToCalculateMonthlyReputation - totalSecondsOfDayTillCurrentTime
    }

  val taskToCalculateAndStoreAllTimeReputation = new Runnable {
    override def run() {
      val knolderReputations = allTimeReputation.getKnolderReputation
      writeAllTimeReputation.insertAllTimeReputationData(knolderReputations)
      writeAllTimeReputation.updateAllTimeReputationData(knolderReputations)
    }
  }

  val taskToCalculateAndStoreMonthlyReputation = new Runnable {
    override def run() {
      val monthlyReputation = monthlyReputationPerKnolder.getKnolderMonthlyReputation
      writeMonthlyReputation.insertMonthlyReputationData(monthlyReputation)
      writeMonthlyReputation.updateMonthlyReputationData(monthlyReputation)
    }
  }

  system.scheduler.scheduleAtFixedRate(timeForAllTimeReputation.seconds, 24.hours)(taskToCalculateAndStoreAllTimeReputation)
  system.scheduler.scheduleAtFixedRate(timeForMonthlyReputation.seconds, 24.hours)(taskToCalculateAndStoreMonthlyReputation)

  val quarterlyReputationActorRef = system.actorOf(Props(new QuarterlyReputationActor(quarterlyReputation,
    writeQuarterlyReputation)), "quarterlyReputationActor")
  QuartzSchedulerExtension.get(system).createSchedule("quarterlyReputationScheduler", None,
    "0 0 1 1 1/1 ? *", None, TimeZone.getTimeZone("Asia/Calcutta"))
  QuartzSchedulerExtension.get(system).schedule("quarterlyReputationScheduler", quarterlyReputationActorRef,
    "write quarterly reputation")
}
