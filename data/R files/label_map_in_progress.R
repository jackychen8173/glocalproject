write.csv(data.frame(variable = names(ces2021dtafile)), "C:/Users/jchen/Downloads/variable_names.csv", row.names = FALSE)


column_label_map <- c(
  "cps21_age" = "Age in years",
  "cps21_citizenship" = "Are you a...",
  "cps21_genderid" = "Are you...?", 
  "cps21_trans" = "Are you transgender?",
  "cps21_province" = "In which province or territory are you currently living?",
  "cps21_education" = "What is the highest level of education that you have completed?",
  "cps21_demsat" = "On the whole, how satisfied are you with the way democracy works in Canada?",
  "cps21_interest_gen_1" = "How interested are you in politics generally? Set the slider to
          a number from 0 to 10, where 0 means no interest at all, and 10 means a great deal of
          interest",
  "cps21_interest_elxn_1" = "How interested are you in this federal election? Set the slider
        to a number from 0 to 10, where 0 means no interest at all, and 10 means a great deal
        of interest.", 
  "cps21_v_likely" = "On election day, are you...",
  "cps21_v_likely_pr" = "For permanent residents, If you become a Canadian citizen, how likely are you to vote in the
first election for which you are eligible?"
  "cps21_howvote1" = "For eligible and certain or likely voters, how are you most likely to vote?",
  "cps21_howvote2" = "For those already voted, How did you vote?",
  "cps21_howvote3" = "For those unlikely to vote, if you choose to vote in the current
      election, what voting method do you think you would use? (Select one)",
  "cps21_comfort1" = "For those certian or likely to vote, Regardless of how you plan to vote, how comfortable are you with the
  idea of voting in person during the coronavirus (COVID-19) pandemic?",
  "cps21_comfort2" = "For those unlikely to vote, If you decide to vote, how comfortable are you with the idea of voting
  in person during the coronavirus (COVID-19) pandemic?",
  "cps21_comfort3" = "For those already voted, Regardless of how you voted, how comfortable were you with the idea
  of voting in person during the coronavirus (COVID-19) pandemic?"
  "cps21_votechoice" = "For those eligible and certain or likely to vote, Which party do you think you will vote for?"
  "cps21_votechoice_pr" = "For those not eligible to vote but certain or likely to vote if they became Canadian citizens,
      If you could vote in this election, which party do you think you would vote for?",
  "cps21_vote_unlikely" = "For Canadians unlikely to vote, If you decide to vote, which party do you think you will vote for?",
  "cps21_vote_unlike_pr" = "For non Canadian citizens that don't know how likely to vote they are to vote,
        If you could vote in this election, and decided to vote, which party do you think you would vote for?",
  "cps21_v_advance" = "For those already voted, which party did you vote?",
  "cps21_vote_lean" = "For those who don't know if they are to vote, Is there a party you are leaning towards?",
  "cps21_vote_lean_pr" = "For those uneligible to vote and don't know if they would vote, 
      If you could vote in this election, is there a party you would be leaning towards?"
  "cps21_2nd_choice" = "For those certain or likely to vote, And which party would be your second choice?",
  "cps21_2nd_choice_pr" = "For those uneligible but certain or likely to vote if become Canadian citizen, 
      And which party would be your second choice?",
  "combined_cps21_not_vote_for" = "Are there any parties that you would absolutely not vote for? (Select all that apply)",
  "combined_cps21_not_vote_for_w" = "Why would you not vote for this party/these parties? (Select all that apply)",
  "cps21_fed_gov_sat How satisfied are you with the performance of the federal government under Justin Trudeau?",
  "cps21_party_rating_23" = "How do you feel about the federal political parties below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the party and 100
      means you really like the party: Liberal Party",
  "cps21_party_rating_24" = "How do you feel about the federal political parties below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the party and 100
      means you really like the party: Conservative Party", 
  "cps21_party_rating_25" = "How do you feel about the federal political parties below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the party and 100
      means you really like the party: NDP", 
  "cps21_party_rating_26" = "How do you feel about the federal political parties below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the party and 100
      means you really like the party: Bloc Québécois", 
  "cps21_party_rating_27" = "How do you feel about the federal political parties below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the party and 100
      means you really like the party: Green Party", 
  "cps21_party_rating_29" = "How do you feel about the federal political parties below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the party and 100
      means you really like the party: People's Party of Canada", 
  "cps21_lead_rating_23" = "How do you feel about the federal party leaders below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the leader and 100
      means you really like the leader: Justin Trudeau", 
  "cps21_lead_rating_24" = "How do you feel about the federal party leaders below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the leader and 100
      means you really like the leader: Erin O'Toole", 
  "cps21_lead_rating_25" = "How do you feel about the federal party leaders below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the leader and 100
      means you really like the leader: Jagmeet Singh", 
  "cps21_lead_rating_26" = "How do you feel about the federal party leaders below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the leader and 100
      means you really like the leader: Yves-François Blanchet", 
  "cps21_lead_rating_27" = "How do you feel about the federal party leaders below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the leader and 100
      means you really like the leader: Annamie Paul", 
  "cps21_lead_rating_29" = "How do you feel about the federal party leaders below? Set the
      slider to a number from 0 to 100, where 0 means you really dislike the leader and 100
      means you really like the leader: Maxime Bernier", 
  "cps21_cand_rating_23" = "How do you feel about the candidates in your local riding? Set
      the slider to a number from 0 to 100, where 0 means you really dislike the candidate
      and 100 means you really like the candidate: Liberal candidate in your riding", 
  "cps21_cand_rating_24" = "How do you feel about the candidates in your local riding? Set
      the slider to a number from 0 to 100, where 0 means you really dislike the candidate
      and 100 means you really like the candidate: Conservative candidate in your riding", 
  "cps21_cand_rating_25" = "How do you feel about the candidates in your local riding? Set
      the slider to a number from 0 to 100, where 0 means you really dislike the candidate
      and 100 means you really like the candidate: NDP candidate in your riding", 
  "cps21_cand_rating_26" = "How do you feel about the candidates in your local riding? Set
      the slider to a number from 0 to 100, where 0 means you really dislike the candidate
      and 100 means you really like the candidate: Bloc Québécois candidate in your riding", 
  "cps21_cand_rating_27" = "How do you feel about the candidates in your local riding? Set
      the slider to a number from 0 to 100, where 0 means you really dislike the candidate
      and 100 means you really like the candidate: Green candidate in your riding", 
  "cps21_lr_parties_1" = "In politics, people sometimes talk of left and right. Where would you
      place the federal political parties on a scale from 0 to 10 where 0 means the left and 10
      means the right? - Liberal Party",
  "cps21_lr_parties_2" = "In politics, people sometimes talk of left and right. Where would you
      place the federal political parties on a scale from 0 to 10 where 0 means the left and 10
      means the right? - Conservative Party",
  "cps21_lr_parties_3" = "In politics, people sometimes talk of left and right. Where would you
      place the federal political parties on a scale from 0 to 10 where 0 means the left and 10
      means the right? - NDP",
  "cps21_lr_parties_4" = "In politics, people sometimes talk of left and right. Where would you
      place the federal political parties on a scale from 0 to 10 where 0 means the left and 10
      means the right? - Bloc Québécois",
  "cps21_lr_parties_5" = "In politics, people sometimes talk of left and right. Where would you
      place the federal political parties on a scale from 0 to 10 where 0 means the left and 10
      means the right? - Green Party",
  "cps21_lr_parties_7" = "In politics, people sometimes talk of left and right. Where would you
      place the federal political parties on a scale from 0 to 10 where 0 means the left and 10
      means the right? - People’s Party of Canada",
  "cps21_lr_scale_bef_1" = "Using the same scale where 0 means the left and 10 means the
      right, where would you place yourself on this scale?",
  "combined_cps21_lead_int" = "Which party leader(s) below do you think is/are intelligent? (Select all that apply)",
  "combined_cps21_lead_strong" = "Which party leader(s) below do you think provide(s) strong leadership? (Select all that apply)",
  "combined_cps21_lead_trust" = "Which party leader(s) below do you think is/are trustworthy? (Select all that apply)",
  "combined_cps21_lead_cares" = "Which party leader(s) below do you think really care(s) about people like you? (Select all that apply)",
  "cps21_spend_educ" = "How much should the federal government spend on education?",
  "cps21_spend_env" = "How much should the federal government spend on the environment?",
  "cps21_spend_just_law" = "How much should the federal government spend on justice law?",
  "cps21_spend_defence" = "How much should the federal government spend on defence?",
  "cps21_spend_imm_min" = "How much should the federal government spend on immigrants and minorities?",
  "cps21_spend_rec_indi" = "How much should the federal government spend on reconciliation with Indigenous Peoples?",
  "cps21_spend_afford_h" = "How much should the federal government spend on affordable housing?",
  "cps21_spend_nation_c" = "How much should the federal government spend on a national childcare system?",
  "cps21_pos_mailtrust" = "Voting by mail is equally as trustworthy as voting in person.",
  "cps21_pos_fptp" = "Canada should change its electoral system from “First Past the Post to a “proportional representation” system.",
  "cps21_pos_life Individuals who are terminally ill should be allowed to end their lives with the assistance of a doctor.",
  "cps21_pos_cannabis" = "Possession of cannabis should be a criminal offence.",
  "cps21_pos_carbon" = "To help reduce greenhouse gas emissions, the federal government should continue the carbon tax.",
  "cps21_pos_energy" = "The federal government should do more to help Canada’s energy sector, including building oil pipelines.",
  "cps21_pos_envreg" = "Environmental regulation should be stricter, even if it leads to consumers having to pay higher prices",
  "cps21_pos_jobs" = "When there is a conflict between protecting the environment and creating jobs, jobs should come first.",
  "cps21_pos_subsid" = "The federal government should end all corporate and economic development subsidies.",
  "cps21_pos_trade" = "There should be more free trade with other countries, even if it hurts some industries in Canada.",
  "cps21_covid_liberty The public health recommendations aimed at slowing the spread of the COVID-19 virus are threatening my liberty",
  "cps21_econ_retro Over the past year, has Canada's economy...",
  "cps21_econ_fed_bette Have the policies of the federal government made Canada's economy...",
  "cps21_issue_handle_1" = "Which party would do the best job at handling each of the following issues? - Healthcare", 
  "cps21_issue_handle_2" = "Which party would do the best job at handling each of the following issues? - Education", 
  "cps21_issue_handle_3" = "Which party would do the best job at handling each of the following issues? - Environment", 
  "cps21_issue_handle_4" = "Which party would do the best job at handling each of the following issues? - Crime and Justice", 
  "cps21_issue_handle_5" = "Which party would do the best job at handling each of the following issues? - Defence", 
  "cps21_issue_handle_6" = "Which party would do the best job at handling each of the following issues? - International diplomacy", 
  "cps21_issue_handle_7" = "Which party would do the best job at handling each of the following issues? - Immigration and minorities", 
  "cps21_issue_handle_8" = "Which party would do the best job at handling each of the following issues? - COVID-19 Pandemic", 
  "cps21_issue_handle_9" = "Which party would do the best job at handling each of the following issues? - Economy", 
  "cps21_most_seats_1" = "For each of the parties below, 
      how likely is each party to win the most seats in the House of Commons? - Liberal Party",
  "cps21_most_seats_2" = "For each of the parties below, 
      how likely is each party to win the most seats in the House of Commons? - Conservative Party",
  "cps21_most_seats_3" = "For each of the parties below, 
      how likely is each party to win the most seats in the House of Commons? - NDP",
  "cps21_most_seats_4" = "For each of the parties below, 
      how likely is each party to win the most seats in the House of Commons? - Bloc Québécois",
  "cps21_most_seats_5" = "For each of the parties below, 
      how likely is each party to win the most seats in the House of Commons? - Green Party",
  "cps21_win_local_1" = "For each of the parties below, how likely is each party to win the seat
      in your own local riding? - Liberal Party",
  "cps21_win_local_2" = "For each of the parties below, how likely is each party to win the seat
      in your own local riding? - Conservative Party",   
  "cps21_win_local_3" = "For each of the parties below, how likely is each party to win the seat
      in your own local riding? - NDP",   
  "cps21_win_local_4" = "For each of the parties below, how likely is each party to win the seat
      in your own local riding? - Bloc Québécois",   
  "cps21_win_local_5" = "For each of the parties below, how likely is each party to win the seat
      in your own local riding? - Green Party",   
  "cps21__candidateref" = "Which candidate do you want to win the seat in your riding?",
  "cps21_candidate_imag" = "Imagine you were the only voter in the election. Which candidate would you want to win in your riding?",
  "cps21_outcome_most" = "Which election outcome would you most prefer?",
  "cps21_outcome_least" = "Which election outcome would you least prefer?",
  "cps21_minority_gov" = "Do you think minority governments are:",
  "cps21_imm" = "Do you think Canada should admit:",
  "cps21_refugees" = "Do you think Canada should admit:",
  "cps21_govt_confusing" = "Sometimes, politics and government seem so complicated that a person like me 
      can't really understand what's going on",
  "cps21_govt_say" = "People like me don't have any say about what the government does.",
  "cps21_pol_eth" = "It is important that politicians behave ethically in office.",
  "cps21_lib_promises" = "Justin Trudeau kept the election promises he made in 2019.",
  "cps21_news_cons" = "On average, how much time do you usually spend watching,
    reading, and listening to news each day?",
  "cps21_finmin_name" = "What is the name of the federal Minister of Finance?",
  "cps21_govgen_name" = "What is the name of the Governor-General of Canada?",
  "cps21_volunteer" = "In the past 12 months, how many times did you volunteer for a group
      or organization such as a school, a religious organization, or sports or community
      associations?",
  "cps21_duty_choice" = "People have different views about voting. For some, voting is a
      duty. They feel that they should vote in every election. For others, voting is a choice.
      They only vote when they feel strongly about that election. For you personally, is voting
      first and foremost a Duty or a Choice?",
  "cps21_quebec_sov" = "Are you very favourable, somewhat favourable, somewhat
      opposed, or very opposed to Quebec sovereignty, that is Quebec is no longer a part of
      Canada?",
  "cps21_own_fin_retro" = "Over the past year, has your financial situation:",
  "cps21_ownfinanc_fed" = "Have the policies of the federal government made your
      financial situation...",
  "cps21_own_fin_future" = "Over the next year, do you think your financial situation will:",
  "combined_cps21_covidrelief" = "Have you applied for any of the following COVID relief programs?
      Please select all that apply",
  "cps21_groupdiscrim_1" =  "How much discrimination is there in Canada against each of the
      following groups? - Indigenous Peoples",
  "cps21_groupdiscrim_2" =  "How much discrimination is there in Canada against each of the
      following groups? - Black people or people of colour",
  "cps21_groupdiscrim_3" =  "How much discrimination is there in Canada against each of the
      following groups? - Immigrants",
  "cps21_groupdiscrim_4" =  "How much discrimination is there in Canada against each of the
      following groups? - Women",
  "cps21_groupdiscrim_5" =  "How much discrimination is there in Canada against each of the
      following groups? - Men",
  "cps21_groupdiscrim_6" =  "How much discrimination is there in Canada against each of the
      following groups? - Gays and lesbians",
  "cps21_groupdiscrim_7" =  "How much discrimination is there in Canada against each of the
      following groups? - Transgender people",
  "cps21_groupdiscrim_8" =  "How much discrimination is there in Canada against each of the
      following groups? - White people",
  "cps21_prov_gov_sat" = "How satisfied are you with the performance of your provincial
      government under your premier",
  "cps21_covid_sat_1" = "How satisfied are you with how each of the following have handled
      the coronavirus outbreak? - Federal government",
  "cps21_covid_sat_2" = "How satisfied are you with how each of the following have handled
      the coronavirus outbreak? - Provincial government",
  "cps21_covid_sat_3" = "How satisfied are you with how each of the following have handled
      the coronavirus outbreak? - Local government",
  "cps21_vaccine_mandat_1" = "Should vaccination be required to: Travel by air or rail in Canada",
  "cps21_vaccine_mandat_2" = "Should vaccination be required to: Go to a bar or restaurant",
  "cps21_vaccine_mandat_3" = "Should vaccination be required to: Work in a hospital",
  "cps21_vaccine1" = "Have you been vaccinated?",
  "cps21_vaccine2" = "Are you eligible to be vaccinated?",
  "cps21_vaccine3" = "Are you:",
  "cps21_fed_id" = "In federal politics, do you usually think of yourself as a:",
  "cps21_fed_id_str" = "How strongly about the party do you feel?",
  "cps21_prov_id" = "In provincial politics, do you usually think of yourself as a:",
  "cps21_prov_id_str" = "How strongly about the party do you feel?",
  "cps21_groups_therm_1" = "How do you feel about the following groups? Set the slider to
      any number from 0 to 100, where 0 means you really dislike the group and 100 means
      you really like the group. - Racial minorities",
  "cps21_groups_therm_2" = "How do you feel about the following groups? Set the slider to
      any number from 0 to 100, where 0 means you really dislike the group and 100 means
      you really like the group. - Immigrants",
  "cps21_groups_therm_7" = "How do you feel about the following groups? Set the slider to
      any number from 0 to 100, where 0 means you really dislike the group and 100 means
      you really like the group. - Americans",
  "cps21_groups_therm_3" = "How do you feel about the following groups? Set the slider to
      any number from 0 to 100, where 0 means you really dislike the group and 100 means
      you really like the group. - Francophones",
  "cps21_groups_therm_4" = "How do you feel about the following groups? Set the slider to
      any number from 0 to 100, where 0 means you really dislike the group and 100 means
      you really like the group. - Indigenous peoples",
  "cps21_groups_therm_6" = "How do you feel about the following groups? Set the slider to
      any number from 0 to 100, where 0 means you really dislike the group and 100 means
      you really like the group. - Feminists",
  "cps21_spoil" = "Have you ever intentionally spoiled your ballot in an election (e.g.
      intentionally filled out your ballot so your vote would not be counted for any candidate)?",
  "cps21_turnout_2019" = "Did you happen to vote in the last Federal election in 2019?",
)

# cps21_imp_iss, cps21_imp_loc_iss, cps21_camp_issue, cps21_premier_name, origin, pes21_where_info
# NOT INCLUDED BUT INTERESTING: CAMPAIGN ISSUES AND PARTY ISSUES

# scake 1-100: party_rating, lead_rating, cand_rating, groups_therm