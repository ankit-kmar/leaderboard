package com.knoldus.leader_board.infrastructure

import org.scalatest.Suites

class MainSpec extends Suites(
  new StoreBlogsImplSpec,
  new StoreKnolxImplSpec,
  new FetchBlogsImplSpec,
  new FetchKnolxImplSpec,
  new ReadContributionImplSpec,
  new WriteAllTimeReputationImplSpec,
  new ReadAllTimeReputationImplSpec,
  new WriteMonthlyReputationImplSpec,
  new ReadMonthlyReputationImplSpec,
  new WriteQuarterlyReputationImplSpec,
  new ReadQuarterlyReputationImplSpec,
  new FetchReputationImplSpec,
  new FetchCountWithReputationImplSpec,
  new StoreWebinarImplSpec,
  new FetchKnolderContributionDetailsImplSpec,
  new FetchTechHubImplSpec,
  new StoreTechHubImplSpec,
  new StoreOSContributionDetailsImplSpec,
  new StoreConferenceDetailsImplSpec,
  new StoreBooksContributionImplSpec,
  new StoreResearchPapersContributionImplSpec,
  new StoreTopFiveLeadersImplSpec,
  new FetchAllTimeReputationImplSpec,
  new FetchMonthlyTopFiveLeadersImplSpec,
  new ContributionScoreMultiplierAndSpikeMonthImplSpec,
  new FetchMonthlyKnolderContributionImplSpec,
  new WriteMonthlyContributionImplSpec,
  new StoreMeetupContributionImplSpec
)
